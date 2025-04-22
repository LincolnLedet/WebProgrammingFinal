import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req: NextRequest) {

  const searchParams = req.nextUrl.searchParams;
  const genre = searchParams.get("genre")

  const client = await clientPromise
  const db = client.db()
  const playlists = db.collection('playlists')

  let genrePlaylists = []
  if (genre === 'all') {
    genrePlaylists = await playlists.find().toArray()
  } else {
    genrePlaylists = await playlists.find({ genre }).toArray()
  }

  // Convert ObjectId to string
  const transformed = genrePlaylists.map(pl => ({
    ...pl,
    _id: pl._id.toString(),
  }))
  
  return NextResponse.json(transformed)
}
