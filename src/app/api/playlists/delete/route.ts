import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }
  const { playlistId } = await req.json()
  if (playlistId == null) {
    return NextResponse.json({ error: 'Missing playlistName or songId' }, { status: 400 })
  }
  const userEmail = session.user.email

  console.log(playlistId)
  console.log(userEmail)

  const client = await clientPromise
  const db = client.db()

  await db.collection('playlists').findOneAndDelete(
    { name: playlistId, userEmail: session.user.email }
  )

  const userPlaylists = await db.collection('playlists').find({ userEmail }).toArray()

  // Convert ObjectId to string
  const transformed = userPlaylists.map(pl => ({
    ...pl,
    _id: pl._id.toString(),
  }))
  
  return NextResponse.json(transformed)
}
