'use client'
import React, { useState, useEffect, useRef } from 'react'
import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import TopBar from './components/TopBar'
import Image from 'next/image'
import styles from './not-found.module.css'

interface Playlist {
  _id: number
  name: string
  picture: string
  genre: string
  userName: string
}

export default function PageNotFound() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  

  return (
    <div className={styles.main_body}>
      <TopBar title={"DAWGIFY"} changeLogStatus={setIsLoggedIn} />
      <hr></hr>
      <div className={styles.body}>
        <h1 className={styles.title}>{"404 PAGE NOT FOUND"}</h1>
        <p> Uh oh bucko! Looks like YOU made a mistake, look over at that search bar and maybe try a little harder this time </p>
      </div>
    </div>
  )
}
