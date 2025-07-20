import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(req: Request) {
  // Check if the user is authenticated and has admin role
  const session = await getServerSession();
  
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }
  
  try {
    const client = await clientPromise;
    const db = client.db();
    
    // Fetch all users but exclude sensitive fields like passwords
    const users = await db
      .collection("users")
      .find({}, { projection: { password: 0 } })
      .toArray();
    
    return NextResponse.json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
} 