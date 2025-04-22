'use client'

import React, { useEffect, useState, useRef } from 'react'
import styles from './topBar.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn, signOut, useSession } from 'next-auth/react'
import dawglogo from '../images/dawglogo.png'

export default function TopBar({
  title,
  changeLogStatus,
}: {
  title: string
  changeLogStatus: (loggedIn: boolean) => void
}) {
  const router = useRouter()
  const { data: session, status } = useSession()

  const [isOpened, setIsOpened] = useState(false)
  const ref = useRef<HTMLDialogElement>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // modal show/hide
  useEffect(() => {
    if (isOpened) {
      ref.current?.showModal()
      document.body.classList.add('modal-open')
    } else {
      ref.current?.close()
      document.body.classList.remove('modal-open')
    }
  }, [isOpened])

  // handle credential login
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
      callbackUrl: '/profile',
    })

    setLoading(false)

    if (result?.error) {
      setError('Invalid email or password')
    } else {
      setIsOpened(false)
      setEmail('')
      setPassword('')
      changeLogStatus(true)
      if (result?.url) router.push(result.url)
    }
  }

  const notLoggedIn = (
    <div className={styles.not_logged_in}>
      <p onClick={() => setIsOpened(true)} className={styles.p_link}>
        Login
      </p>
      <p>|</p>
      <p onClick={() => router.push('/register')} className={styles.p_link}>
        Register
      </p>
    </div>
  )
  const user = session?.user

  const loggedIn = (
    <div className={styles.message}>
      <h1>
        Welcome, {user?.name || user?.email}!
      </h1>
      <div className={styles.links}>
        <p
          onClick={() => router.push('/profile')}
          className={styles.p_link}
        >
          My Account
        </p>
        <p>|</p>
        <p
          onClick={() => {
            signOut({ callbackUrl: '/' })
            changeLogStatus(false)
          }}
          className={styles.p_link}
        >
          Logout
        </p>
      </div>
    </div>
  )

  return (
    <div className={styles.main_body}>
      {/* Login Modal */}
      <dialog ref={ref} className={styles.dialog}>
        <div className={styles.modal_body}>
          <button
            className={styles.close}
            onClick={() => setIsOpened(false)}
          >
            X
          </button>
          <h2>Login</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <label>Email</label>
            <input
              value={email}
              type="email"
              onChange={e => setEmail(e.target.value)}
              required
              className={styles.text_fields}
            />
            <label>Password</label>
            <input
              value={password}
              type="password"
              onChange={e => setPassword(e.target.value)}
              required
              className={styles.text_fields}
            />
            {error && <p className={styles.error}>{error}</p>}
            <button type="submit" disabled={loading}>
              {loading ? 'Logging in…' : 'Submit'}
            </button>
          </form>
          <Link href="/register">Create new account</Link>
        </div>
      </dialog>

      {/* Logo & Title */}
      <Link href="/splash">
        <Image src={dawglogo} height={80} width={120} alt="Logo" id={styles.icon} />
      </Link>
      <Link href="/home">
        <p id={styles.dawgify}>{title}</p>
      </Link>

      {/* Right‐hand links */}
      {session ? loggedIn : notLoggedIn}
    </div>
  )
}
