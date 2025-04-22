import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }
    const userEmail = session!.user!.email!
    const userName = session!.user!.name!


    const body = await req.json()
    const { name, picture, genre} = body

    if (!name || !picture) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db() // or your DB name

    const playlist = {
      userEmail,
      name,
      userName,
      picture,
      genre,
      songs: [],
      createdAt: new Date(),
    }

    const result = await db.collection('playlists').insertOne(playlist)

    return NextResponse.json({ message: 'Playlist saved', playlist: playlist }, { status: 201 })
  } catch (err) {
    console.error('Error saving playlist:', err)
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}
