import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

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
