'use client'

import { cn } from '@/lib/utils'
import { NotepadText, Plus, Search, X } from 'lucide-react'
import { useDebounceCallback } from 'usehooks-ts'
import { useNoteStore } from '@/store/useNote'

import { Button } from '../ui/button'
import { Input } from '../ui/input'
import Logo from '../Logo'

const Sidebar = () => {
  const notes = useNoteStore((state) => state.notes)
  const searchResults = useNoteStore((state) => state.searchResults)
  const searchNotes = useNoteStore((state) => state.searchNotes)
  const setIsSearch = useNoteStore((state) => state.setIsSearch)
  const isSearch = useNoteStore((state) => state.isSearch)
  const openNote = useNoteStore((state) => state.openNote)
  const activeIndex = useNoteStore((state) => state.activeIndex)
  const isEdit = useNoteStore((state) => state.isEdit)
  const createNewNote = useNoteStore((state) => state.createNewNote)

  const handleSearch = useDebounceCallback((value: string) => {
    searchNotes(value)
  }, 300)

  return (
    <div className='hidden h-full w-full max-w-xs flex-col space-y-6 bg-black py-6 lg:flex'>
      <div className='flex flex-col space-y-6 px-5'>
        <div className='flex items-center justify-between'>
          <Logo />
          <Search
            className='cursor-pointer text-2xl text-muted-foreground hover:text-white'
            onClick={() => setIsSearch(true)}
          />
        </div>

        {isSearch ? (
          <div className='flex items-center gap-2 bg-neutral-800 px-2'>
            <Search size={26} className='text-muted-foreground' />
            <Input
              type='text'
              placeholder='Search...'
              className='border-none bg-transparent px-1 text-white focus-visible:ring-0 focus-visible:ring-offset-0'
              onChange={(e) => handleSearch(e.target.value)}
            />
            <X
              size={24}
              className='cursor-pointer text-muted-foreground hover:text-white'
              onClick={() => setIsSearch(false)}
            />
          </div>
        ) : (
          <Button
            className='gap-x-2'
            size={'lg'}
            onClick={createNewNote}
            disabled={isEdit}
          >
            <Plus size={20} />
            New Note
          </Button>
        )}
      </div>

      <div className='flex flex-col space-y-2'>
        <p className='px-5 text-sm text-muted-foreground'>Notes</p>
        <div className='flex flex-col space-y-1'>
          {(isSearch ? searchResults : notes).map((note, index) => (
            <div
              key={index}
              className={cn(
                `cursor-pointer bg-transparent py-3 text-gray-400 hover:bg-[#312EB5] hover:text-white`,
                isEdit && 'pointer-events-none text-gray-600',
                activeIndex === index && 'bg-[#312EB5] text-white'
              )}
              onClick={() => openNote(index)}
            >
              <div className='flex items-center gap-4 px-5'>
                <NotepadText size={20} />
                <span className='truncate font-medium'>
                  {note.title ? note.title : 'Untitled'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
