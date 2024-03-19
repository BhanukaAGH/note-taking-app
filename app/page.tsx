'use client'

import { fetchNotes } from '@/lib/api'
import { useEffect, useState } from 'react'

import ContentArea from '@/components/layout/ContentArea'
import Sidebar from '@/components/layout/Sidebar'

const Home = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchNotes().then(() => setIsLoading(false))
  }, [])

  if (isLoading)
    return (
      <div className='flex h-screen items-center justify-center bg-black text-white'>
        <h1 className='text-white text-4xl font-bold animate-pulse transition-all'>
          Notes.
        </h1>
      </div>
    )

  return (
    <main className='h-screen flex'>
      <Sidebar />
      <ContentArea />
    </main>
  )
}

export default Home
