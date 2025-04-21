import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, picture, userEmail } = body

    if (!userEmail || !name || !picture) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db('Dawgify') // or your DB name

    const playlist = {
      name,
      picture,
      userEmail,
      songs: [],
      createdAt: new Date(),
    }

    const result = await db.collection('playlists').insertOne(playlist)

    return NextResponse.json({ message: 'Playlist saved', playlistId: result.insertedId }, { status: 201 })
  } catch (err) {
    console.error('Error saving playlist:', err)
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}
