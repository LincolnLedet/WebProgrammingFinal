import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function POST(req: NextRequest) {
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
export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }
  const { playlistName, songId } = await req.json()
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

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const playlistName = req.nextUrl.searchParams.get('playlistName')
  if (!playlistName) {
    return NextResponse.json({ error: 'Missing playlistName' }, { status: 400 })
  }

  const client = await clientPromise
  const db = client.db()  // defaults to "test" unless overridden in URI
  const playlist = await db
    .collection('playlists')
    .findOne({ userEmail: session.user.email, name: playlistName })

  if (!playlist) {
    return NextResponse.json({ error: 'Playlist not found' }, { status: 404 })
  }

  // Return the array of songs
  return NextResponse.json(playlist.songs || [])
}
