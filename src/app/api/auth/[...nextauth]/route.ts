import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
import CredentialsProvider from "next-auth/providers/credentials"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "@/lib/mongodb"
import type { NextAuthOptions } from "next-auth"
import bcrypt from "bcrypt"

// Connect to MongoDB manually so we can use it inside `authorize`
const client = await clientPromise
const db = client.db()

export const authOptions: NextAuthOptions = {
  // Use the official MongoDB adapter so users/sessions/accounts are stored
  adapter: MongoDBAdapter(clientPromise),

  providers: [
    // 👤 Credentials-based login (email + password)

    // Spotify login (can be used to link to an existing account)
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
      authorization: "https://accounts.spotify.com/authorize?scope=user-read-email playlist-read-private",
      profile(profile) {
        return {
          id: profile.id,
          name: profile.display_name || profile.id,
          email: profile.email,
          image: profile.images?.[0]?.url ?? null,
        };
      },
    }),
  ],

  session: {
    // JWT strategy lets you control sessions more easily in stateless mode
    strategy: "jwt",
  },

  callbacks: {
    // Attach user ID from DB to the JWT token
    async jwt({ token, user, account }) {
      if (account?.provider === 'spotify') {
        token.accessToken = account.access_token;
      }
      if (user) {
        token.id = user.id
      }
      return token;
    },

    // Attach user ID from JWT to session object
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      (session as any).accessToken = token.accessToken;
      return session
    },

    async signIn({ user, account}) {
      return true;
    },
  },
  
  // Enable debug logs in the terminal
  debug: true,
}

// Export the NextAuth handler for both GET and POST routes
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
