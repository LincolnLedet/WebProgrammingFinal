import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });


  const userEmail = session.user.email

  const client = await clientPromise
  const db = client.db()
  const playlists = db.collection('playlists')

  const userPlaylists = await playlists.find({ userEmail }).toArray()

  // Convert ObjectId to string
  const transformed = userPlaylists.map(pl => ({
    ...pl,
    _id: pl._id.toString(),
  }))
  
  return NextResponse.json(transformed)

  return NextResponse.json(userPlaylists)
}
