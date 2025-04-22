import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
//import bcrypt from 'bcrypt'
import clientPromise from '@/lib/mongodb'

const bcrypt = require('bcryptjs')

// URL: POST /api/signup
// Purpose: Handle user registration by hashing the password and creating a new user record in MongoDB

export async function POST(request: NextRequest) {
  try {
    //parse the JSON body
    const { email, password, name } = await request.json()

    //check the input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      )
    }

    //connect to mongo
    const client = await clientPromise
    const db = client.db()

    //check if the user already exists
    const existingUser = await db.collection('users').findOne({ email })
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists.' },
        { status: 409 }
      )
    }

    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    //create the user record
    const newUser = {
      email,
      name: name || email.split('@')[0], // default to part before @ if no name
      hashedPassword,
      createdAt: new Date(),
    }
    const result = await db.collection('users').insertOne(newUser)

    const userResponse = {
      id: result.insertedId.toString(),
      email: newUser.email,
      name: newUser.name,
      createdAt: newUser.createdAt,
    }

    return NextResponse.json({ user: userResponse }, { status: 201 })
  } catch (error: any) {
    console.error('Error in /api/signup:', error)
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    )
  }
}
