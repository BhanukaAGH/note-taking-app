import { useNoteStore } from '@/store/useNote'

import { Button } from '../ui/button'

const NoteEmpty = () => {
  const createNewNote = useNoteStore((state) => state.createNewNote)

  return (
    <div className='flex flex-col max-w-4xl mx-auto items-center justify-center h-full'>
      <div className='text-center'>
        <h2 className='text-2xl font-bold text-neutral-700'>
          No Note Selected
        </h2>
        <p className='mt-2 text-neutral-500'>
          Click the &quot;New Note&quot; button to get started
        </p>
      </div>

      <div className='mt-8'>
        <Button
          size={'lg'}
          onClick={createNewNote}
          className='bg-neutral-800 hover:bg-neutral-700 text-white'
        >
          New Note
        </Button>
      </div>
    </div>
  )
}

export default NoteEmpty
