import { useNoteStore } from '@/store/useNote'

import { Button } from '../ui/button'

const NoteEmpty = () => {
  const createNewNote = useNoteStore((state) => state.createNewNote)

  return (
    <div className='mx-auto flex h-full max-w-4xl flex-col items-center justify-center'>
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
          className='bg-neutral-800 text-white hover:bg-neutral-700'
        >
          New Note
        </Button>
      </div>
    </div>
  )
}

export default NoteEmpty
