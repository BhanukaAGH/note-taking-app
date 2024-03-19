import { cn } from '@/lib/utils'

import { NotepadText, Plus, Search } from 'lucide-react'
import { Button } from '../ui/button'
import { notes } from '@/data/notes'

const Sidebar = () => {
  return (
    <div className='flex flex-col h-full max-w-xs w-full bg-black py-6 space-y-6'>
      <div className='flex flex-col px-5 space-y-6'>
        <div className='flex items-center justify-between'>
          <h1 className='text-white text-2xl font-bold'>Notes.</h1>
          <Search className='text-2xl text-muted-foreground cursor-pointer hover:text-white' />
        </div>

        <Button className='gap-x-2' size={'lg'}>
          <Plus size={20} />
          New Note
        </Button>
      </div>

      <div className='flex flex-col space-y-2'>
        <p className='text-muted-foreground text-sm px-5'>Notes</p>
        <div className='flex flex-col space-y-1'>
          {notes.map((note, index) => (
            <div
              key={index}
              className={cn(
                `bg-transparent text-gray-400 py-3 hover:bg-[#312EB5] hover:text-white cursor-pointer`
              )}
            >
              <div className='px-5 flex items-center gap-4'>
                <NotepadText size={20} />
                <span className='font-medium truncate'>{note.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
