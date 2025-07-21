import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { compare } from "bcryptjs";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// Export the NextAuth options to be reused across the app
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const client = await clientPromise;
        const db = client.db();
        const user = await db
          .collection("users")
          .findOne({ email: credentials!.email });
        if (!user) throw new Error("User not found");
        const isValid = await compare(credentials!.password, user.password);
        if (!isValid) throw new Error("Invalid password");
        
        // Include the role in the returned user object
        return { 
          id: user._id.toString(), 
          email: user.email, 
          name: user.name,
          role: user.role || "user" // Make sure to include the role
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      const client = await clientPromise;
      const db = client.db();
      const users = db.collection("users");
      
      // For OAuth accounts (like Google)
      if (account && account.provider !== "credentials") {
        // Check if a user with this email already exists
        const existingUser = await users.findOne({ email: user.email });
        
        if (existingUser) {
          // If user exists but doesn't have OAuth provider linked
          if (!existingUser.oauthProviders || !existingUser.oauthProviders.includes(account.provider)) {
            // Link this OAuth provider to the existing account
            await users.updateOne(
              { _id: existingUser._id },
              { 
                $set: { 
                  // Update profile data with latest from OAuth
                  name: user.name || existingUser.name,
                  image: user.image || existingUser.image,
                  updatedAt: new Date(),
                },
                $addToSet: { 
                  oauthProviders: account.provider,
                  // Store OAuth account details for reference
                  linkedAccounts: {
                    provider: account.provider,
                    providerAccountId: account.providerAccountId,
                    linkedAt: new Date()
                  }
                }
              }
            );
          }
          
          // Use the existing user's ID for the session
          user.id = existingUser._id.toString();
          return true;
        } else {
          // Create a new user record for this OAuth login
          const result = await users.insertOne({
            name: user.name,
            email: user.email,
            image: user.image,
            createdAt: new Date(),
            oauthProviders: [account.provider],
            linkedAccounts: [{
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              linkedAt: new Date()
            }]
          });
          
          // Set the user ID to the newly created record
          user.id = result.insertedId.toString();
        }
      }
      
      return true;
    },
    
    async jwt({ token, user, account }) {
      // Initial sign in
      if (user) {
        token.id = user.id;
        token.role = user.role || "user";
        
        // If this is an OAuth sign-in, we might need to update the token
        if (account && account.provider !== "credentials") {
          const client = await clientPromise;
          const db = client.db();
          
          // Get the most up-to-date user data
          const dbUser = await db.collection("users").findOne({ 
            _id: new ObjectId(user.id) 
          });
          
          if (dbUser) {
            // Update token with latest user data
            token.name = dbUser.name;
            token.email = dbUser.email;
            token.picture = dbUser.image;
            token.role = dbUser.role || "user";
          }
        }
      }
      return token;
    },
    
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id;
        session.user.role = token.role;
        
        // Optionally, update session with the latest user data from the database
        const client = await clientPromise;
        const db = client.db();
        
        const user = await db.collection("users").findOne({ 
          _id: new ObjectId(token.id) 
        });
        
        if (user) {
          session.user.name = user.name;
          session.user.email = user.email;
          session.user.image = user.image;
          session.user.role = user.role || "user";
        }
      }
      return session;
    }
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // Refresh session every 24 hours
  },
  secret: process.env.NEXTAUTH_SECRET,
}; 