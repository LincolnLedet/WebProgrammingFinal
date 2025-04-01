// app/about/test.tsx
'use client'
import { useRouter } from 'next/navigation'

export default function AboutPage() {
  const router = useRouter()

  return (
    <button onClick={() => router.push('/')}>
      Go Home
    </button>
  )
}
