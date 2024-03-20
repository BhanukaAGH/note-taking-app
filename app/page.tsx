'use client'

import { fetchNotes } from '@/lib/api'
import { useEffect, useState } from 'react'

import Sidebar from '@/components/layout/Sidebar'
import ContentArea from '@/components/layout/ContentArea'
import MobileSidebar from '@/components/layout/MobileSidebar'
import Loading from '@/components/Loading'

const Home = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchNotes().then(() => setIsLoading(false))
  }, [])

  if (isLoading) return <Loading />

  return (
    <main className='flex h-screen'>
      <Sidebar />
      <ContentArea />
      <MobileSidebar />
    </main>
  )
}

export default Home
