'use client'
import React, { useState, useEffect, useRef } from 'react'
import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import TopBar from '../components/TopBar'
import Image from 'next/image'
import styles from './profile.module.css'
import PlaylistCard from '@/app/components/PlaylistCard';

interface Playlist {
  _id: number
  name: string
  picture: string
  genre: string
  userName: string
}

export default function Profile() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const setIsLoggedIn = (value:boolean) => value;

  // All hooks are declared before any returns
  const [msg, setMsg] = useState("");
  const [name, setName] = useState('')
  const [pictureSrc, setPictureSrc] = useState('')
  const [userPlaylists, setUserPlaylists] = useState<Playlist[]>([])
  const [isOpened, setIsOpened] = useState(false)
  const [genre, setGenre] = useState('') 
  const dialogRef = useRef<HTMLDialogElement>(null)

  // Fetch user playlists
  useEffect(() => {
    if (session) {
      fetch("/api/playlists/user")
        .then((res) => {
          if (!res.ok) throw new Error(res.statusText)
          return res.json()
        })
        .then((data: Playlist[]) => setUserPlaylists(data))
        .catch((err) => console.error("❌ fetch playlists:", err))
    }
  }, [session])

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

  // Loading / login guard
  if (status === 'loading') {
    return <p>Loading your profile…</p>
  }

  const removePlaylist = (pl: Playlist) => {
    fetch('/api/playlists/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          playlistId:pl.name,  // remove by id
        }),
      })
      .then((res) => {
          if (!res.ok) throw new Error(res.statusText)
          return res.json()
      })
      .then((data) => {
        console.log(data)
        return data
      })
      .then((data:Playlist[]) => {
        setUserPlaylists(data)
      })
      .catch((err) => {
        console.error("❌ delete playlist:", err)
      })
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

  const user = session.user

  // Add–playlist handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const body = { name, picture: pictureSrc, genre }
    for (let i = 0; i < userPlaylists.length; i++) {
      if (userPlaylists[i].name === name) {
        setMsg("You already have a playlist named " + name + "!")
        return
      }
    }
    if (genre === "") {
      setMsg("Please choose a category!")
      return
    }
    setMsg("")
    const res = await fetch("/api/playlists/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    if (!res.ok) throw new Error(await res.text())

    const created: Playlist & { playlist: Playlist } = await res.json()
    setUserPlaylists((ps) => [...ps, created.playlist])

    setIsOpened(false)
    setName('')
    setPictureSrc('')
    setGenre("")
  }

  return (
    <div className={styles.main_body}>
      {/* — Add‑Playlist Modal — */}
      <dialog ref={dialogRef} className={styles.dialog}>
        <div className={styles.modal_body}>
          <button className={styles.close} onClick={() => setIsOpened(false)}>
            X
          </button>
          <h1>Add to {user.name || user.email}’s Playlists</h1>
          <form onSubmit={handleSubmit} className={styles.playlist_form}>
            <h2 className={styles.headers}>Playlist Category</h2>
            <select
              value={genre}
              onChange={e => setGenre(e.target.value)}
              className={styles.text_fields}
              required
            >
              <option value="" disabled>Select a category</option>
              <option value="study">Study Music</option>
              <option value="walking">Walking Music</option>
              <option value="game">Game Day Tunes</option>
              <option value="workout">Workout Music</option>
              <option value="club">Club Music</option>
            </select>

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
            {msg && <p>{msg}</p>}
          </form>
        </div>
      </dialog>

      {/* Greeting & TopBar */}
      <TopBar
        title="YOUR PLAYLISTS"
        changeLogStatus={setIsLoggedIn}
      />
      <hr />

      {/* Your Playlists */}
      <section className={styles.body}>
        <ul className={styles.music_tabs}>
          <li className={styles.add_playlist} onClick={() => setIsOpened(true)}>
            <p>Add Playlist</p>
          </li>
          {userPlaylists.map((pl, index) => (
            <PlaylistCard index={index} playlist={pl} isButton={true} clickHandle={() => removePlaylist(pl)} key={pl._id}></PlaylistCard>
          ))}
        </ul>
      </section>
    </div>
  )
}
