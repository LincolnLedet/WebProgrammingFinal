import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('userId')

  const client = await clientPromise
  const db = client.db('your-db-name')
  const playlists = db.collection('playlists')

  const userPlaylists = await playlists.find({ userId }).toArray()

  return NextResponse.json(userPlaylists)
}
