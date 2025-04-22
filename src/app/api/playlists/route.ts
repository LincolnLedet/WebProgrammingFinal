import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(req: NextRequest) {
    const playlistName = req.nextUrl.searchParams.get('playlistName')
    if (!playlistName) {
      return NextResponse.json({ error: 'Missing playlistName' }, { status: 400 })
    }
  
    const client = await clientPromise
    const db = client.db()  // defaults to "test" unless overridden in URI
    const playlist = await db
      .collection('playlists')
      .findOne({name: playlistName })
  
    if (!playlist) {
      return NextResponse.json({ error: 'Playlist not found' }, { status: 404 })
    }
  
    // Return the array of songs
    return NextResponse.json(playlist.songs || [])
  }
  