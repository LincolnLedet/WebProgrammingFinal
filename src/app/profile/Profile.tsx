'use client'
import React, { useState, useEffect, useRef } from 'react'
import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import TopBar from '../components/TopBar'
import Image from 'next/image'
import study from '../images/studymusic.png'
import styles from './profile.module.css'

interface Playlist {
  id: number
  name: string
  picture: string
}

export default function Profile() {
  // Hooks at top
  const { data: session, status } = useSession()
  const router = useRouter()

  const [name, setName] = useState('')
  const [pictureSrc, setPictureSrc] = useState('')
  const [userPlaylists, setUserPlaylists] = useState<Playlist[]>(() =>
    Array.from({ length: 4 }, (_, i) => ({
      id: i,
      name: `Playlist ${i}`,
      picture: study.src,
    }))
  )
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
        <TopBar isLoggedIn={false} title="YOUR PLAYLISTS" changeLogStatus={() => {}} />
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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  
    setUserPlaylists(ps => [
      ...ps,
      { id: ps.length, name, picture: pictureSrc },
    ])
  
    setIsOpened(false)
    setName('')
    setPictureSrc('')
  }
  
  
  

  return (
    <div className={styles.main_body}>
      {/*Connect Spotify */}
      <div style={{ padding: '1rem' }}>
        {!user.spotifyId ? (
          <button
            onClick={() =>
              signIn('spotify', { callbackUrl: '/profile' })
            }
          >
            Connect Spotify
          </button>
        ) : (
          <p>Spotify Connected!</p>
        )}
      </div>
      {!session?.accessToken && (
        <p style={{ color: 'red', textAlign: 'center', fontWeight: 'bold' }}>
          Spotify not connected.
        </p>
      )}

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
        isLoggedIn={true}
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
          {userPlaylists.map(pl => (
            <li
              key={pl.id}
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
