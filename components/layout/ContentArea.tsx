'use client'

import { useEffect } from 'react'
import { useNoteStore } from '@/store/useNote'

import Note from '../note/Note'

const ContentArea = () => {
  const isEdit = useNoteStore((state) => state.isEdit)

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isEdit) {
        event.preventDefault()
        alert()
      }
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [isEdit])

  return (
    <div className='h-full w-full bg-[#1C1C1C] p-12'>
      <Note />
    </div>
  )
}

export default ContentArea
