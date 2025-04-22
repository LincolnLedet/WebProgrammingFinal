import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function POST(req: NextRequest) { // posts a song to a playlist (works for any playlist)
  try {
    const body = await req.json();
    const { playlistName, song } = body;

    const client = await clientPromise;
    const db = client.db();

    await db.collection('playlists').updateOne(
      { name: playlistName },
      { $addToSet: { songs: song } }
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error adding song to playlist:', err);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
export async function DELETE(req: NextRequest) {//removes a song from a playlist
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })// session on valid
  }
  const { playlistName, songId } = await req.json() // playlist does not exsist 
  if (!playlistName || songId == null) {
    return NextResponse.json({ error: 'Missing playlistName or songId' }, { status: 400 })
  }

  const client = await clientPromise
  const db = client.db()

  await db.collection('playlists').updateOne( 
    { userEmail: session.user.email, name: playlistName },
    { $pull: { songs: { id: songId } } }
  )

  return NextResponse.json({ success: true })
}