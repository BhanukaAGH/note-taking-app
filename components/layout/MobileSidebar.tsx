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
        <div className='absolute left-2 top-2 flex aspect-square w-12 items-center justify-center rounded-full bg-neutral-700 text-white lg:hidden'>
          <Menu size={24} />
        </div>
      </SheetTrigger>
      <SheetContent
        side={'left'}
        className='w-full !max-w-xs border-none bg-black p-0 lg:hidden'
      >
        <div className='flex h-full w-full max-w-xs flex-col space-y-6 bg-black py-6'>
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
              <SheetClose>
                <Button
                  className='w-full gap-x-2'
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
                  <SheetClose className='flex items-center gap-4 px-5'>
                    <NotepadText size={20} />
                    <span className='truncate font-medium'>
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
