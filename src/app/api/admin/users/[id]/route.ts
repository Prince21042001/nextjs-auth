import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { logAuditEvent, AuditActions } from "@/lib/audit";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  // Check if the user is authenticated and has admin role
  const session = await getServerSession();
  
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }
  
  try {
    const { id } = params;
    const { role } = await req.json();
    
    // Validate role
    const validRoles = ["user", "admin", "moderator"];
    if (!validRoles.includes(role)) {
      return NextResponse.json(
        { error: "Invalid role specified" },
        { status: 400 }
      );
    }
    
    const client = await clientPromise;
    const db = client.db();
    
    // Get the target user
    const targetUser = await db.collection("users").findOne({ 
      _id: new ObjectId(id) 
    });
    
    if (!targetUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    
    // Prevent admins from demoting themselves
    if (id === session.user.id && role !== "admin") {
      return NextResponse.json(
        { error: "You cannot demote yourself from admin" },
        { status: 400 }
      );
    }
    
    // Check if this is the last admin
    if (targetUser.role === "admin" && role !== "admin") {
      const adminCount = await db
        .collection("users")
        .countDocuments({ role: "admin" });
        
      if (adminCount === 1) {
        return NextResponse.json(
          { error: "Cannot demote the last remaining admin" },
          { status: 400 }
        );
      }
    }
    
    // Update the user's role
    const result = await db.collection("users").updateOne(
      { _id: new ObjectId(id) },
      { $set: { role, updatedAt: new Date() } }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }
    
    // Log the action to audit logs
    await logAuditEvent({
      actorId: session.user.id,
      action: AuditActions.UPDATE_ROLE,
      targetUserId: id,
      details: {
        previousRole: targetUser.role || "user",
        newRole: role,
      },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating user role:", error);
    return NextResponse.json(
      { error: "Failed to update user role" },
      { status: 500 }
    );
  }
} 