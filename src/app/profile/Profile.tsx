'use client'
import React, { useState, useEffect, useRef } from 'react'
import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import TopBar from '../components/TopBar'
import Image from 'next/image'
import styles from './profile.module.css'


interface Playlist {
  id: number
  name: string
  picture: string
  genre: string
}

export default  function Profile() {
  // Hooks at top
  const { data: session, status } = useSession()
  const router = useRouter()

  const [name, setName] = useState('')
  const [pictureSrc, setPictureSrc] = useState('')
  const [userPlaylists, setUserPlaylists] = useState<Playlist[]>([])
  const [loading, setLoading] = useState(true)

 // fetchs user playlists
  useEffect(() => {
    if (session) {
      setLoading(true)
      fetch("/api/playlists/user")
        .then((res) => {
          if (!res.ok) throw new Error(res.statusText)
            return res.json()
        })
        .then((data: Playlist[]) => setUserPlaylists(data))
        .catch((err) => console.error("❌ fetch playlists:", err))
        .finally(() => setLoading(false))
    }
  },[session])
  const [isOpened, setIsOpened] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)

  // Dialog effect
  useEffect(() => {
    if (isOpened) {
      dialogRef.current?.showModal()
      document.body.classList.add('modal-open')
    } else {
      dialogRef.current?.close()
      document.body.classList.remove('modal-open')
    }
  }, [isOpened])

  // Auth guards
  if (status === 'loading') {
    return <p>Loading your profile…</p>
  }
  if (!session) {
    return (
      <div className={styles.main_body}>
        <TopBar title="YOUR PLAYLISTS" changeLogStatus={() => {}} />
        <hr />
        <p style={{ padding: 20 }}>
          You must{' '}
          <button
            onClick={() => signIn('credentials', { callbackUrl: '/profile' })}
            style={{ textDecoration: 'underline', color: 'blue' }}
          >
            log in
          </button>{' '}
          to view your playlists.
        </p>
      </div>
    )
  }

  // uthenticated
  const user = session.user

  // Add–playlist handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
  
    const body = { name, picture: pictureSrc, genre: "" /* or add a genre input */ }
    const res = await fetch("/api/playlists/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    if (!res.ok) throw new Error(await res.text())


    const created: Playlist & { _id: string } = await res.json()
    setUserPlaylists((ps) => [...ps, {
      id: ps.length,         // or map _id to a string id
      name: created.name,
      picture: created.picture,
      genre: created.genre,
    }])

  
    setIsOpened(false)
    setName('')
    setPictureSrc('')
  }
  
  
  

  return (
    <div className={styles.main_body}>
      {/* — Add‑Playlist Modal — */}
      <dialog ref={dialogRef} className={styles.dialog}>
        <div className={styles.modal_body}>
          <button
            className={styles.close}
            onClick={() => setIsOpened(false)}
          >
            X
          </button>
          <h1>Add to {user.name || user.email}’s Playlists</h1>
          <form onSubmit={handleSubmit} className={styles.playlist_form}>
            <h2 className={styles.headers}>Playlist Name</h2>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              className={styles.text_fields}
              required
            />
            <h2 className={styles.headers}>Playlist Photo (URL)</h2>
            <input
              value={pictureSrc}
              onChange={e => setPictureSrc(e.target.value)}
              className={styles.text_fields}
              required
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </dialog>

      {/* — Greeting & TopBar — */}
      <h1 className={styles.welcome}>
        Welcome, {user.name || user.email}!
      </h1>
      <TopBar
        title="YOUR PLAYLISTS"
        changeLogStatus={() => signIn()}
      />

      <hr />

      {/* — Your Playlists — */}
      <section className={styles.body}>
        <ul className={styles.music_tabs}>
          <li
            className={styles.add_playlist}
            onClick={() => setIsOpened(true)}
          >
            <p>Add Playlist</p>
          </li>
          {userPlaylists.map((pl, index) => (
            <li
              key={index}
              className={styles.card_holder}
              onClick={() =>
                router.push(`/playlist-page?name=${encodeURIComponent(pl.name)}&image=${encodeURIComponent(pl.picture)}`)
              }
            >
              <Image
                src={pl.picture}
                width={1210}
                height={170}
                alt={pl.name}
                className={styles.card}
              />
              <p className={styles.text_in_image}>{pl.name}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
