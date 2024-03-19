import { Menu, NotepadText, Plus, Search, X } from 'lucide-react'
import { useNoteStore } from '@/store/useNote'
import { useDebounceCallback } from 'usehooks-ts'
import { cn } from '@/lib/utils'

import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '../ui/sheet'
import Logo from '../Logo'

const MobileSidebar = () => {
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
    <Sheet>
      <SheetTrigger asChild>
        <div className='absolute top-2 left-2 aspect-square rounded-full w-12 flex items-center justify-center bg-neutral-700 text-white lg:hidden'>
          <Menu size={24} />
        </div>
      </SheetTrigger>
      <SheetContent
        side={'left'}
        className='p-0 !max-w-xs w-full bg-black border-none lg:hidden'
      >
        <div className='flex flex-col h-full max-w-xs w-full bg-black py-6 space-y-6'>
          <div className='flex flex-col px-5 space-y-6'>
            <div className='flex items-center justify-between'>
              <Logo />
              <Search
                className='text-2xl text-muted-foreground cursor-pointer hover:text-white'
                onClick={() => setIsSearch(true)}
              />
            </div>

            {isSearch ? (
              <div className='flex items-center gap-2 bg-neutral-800 px-2'>
                <Search size={26} className='text-muted-foreground' />
                <Input
                  type='text'
                  placeholder='Search...'
                  className='bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-white px-1'
                  onChange={(e) => handleSearch(e.target.value)}
                />
                <X
                  size={24}
                  className='text-muted-foreground hover:text-white cursor-pointer'
                  onClick={() => setIsSearch(false)}
                />
              </div>
            ) : (
              <SheetClose>
                <Button
                  className='gap-x-2 w-full'
                  size={'lg'}
                  onClick={createNewNote}
                  disabled={isEdit}
                >
                  <Plus size={20} />
                  New Note
                </Button>
              </SheetClose>
            )}
          </div>

          <div className='flex flex-col space-y-2'>
            <p className='text-muted-foreground text-sm px-5'>Notes</p>
            <div className='flex flex-col space-y-1'>
              {(isSearch ? searchResults : notes).map((note, index) => (
                <div
                  key={index}
                  className={cn(
                    `bg-transparent text-gray-400 py-3 hover:bg-[#312EB5] hover:text-white cursor-pointer`,
                    isEdit && 'pointer-events-none text-gray-600',
                    activeIndex === index && 'bg-[#312EB5] text-white'
                  )}
                  onClick={() => openNote(index)}
                >
                  <SheetClose className='px-5 flex items-center gap-4'>
                    <NotepadText size={20} />
                    <span className='font-medium truncate'>
                      {note.title ? note.title : 'Untitled'}
                    </span>
                  </SheetClose>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default MobileSidebar
