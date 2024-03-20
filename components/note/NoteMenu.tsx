import { CircleEllipsis, Pencil, Trash } from 'lucide-react'
import { useNoteStore } from '@/store/useNote'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'

const NoteMenu = () => {
  const setIsEdit = useNoteStore((state) => state.setIsEdit)
  const removeNote = useNoteStore((state) => state.removeNote)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <CircleEllipsis
          size={30}
          className='cursor-pointer text-muted-foreground ring-0 hover:text-white'
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='mt-2 w-56 border-none bg-neutral-700 text-white'
        align='end'
      >
        <DropdownMenuGroup>
          <DropdownMenuItem
            className='flex items-center gap-4 py-3'
            onClick={() => setIsEdit(true)}
          >
            <Pencil size={20} /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            className='flex items-center gap-4 py-3 focus:bg-destructive focus:text-white'
            onClick={removeNote}
          >
            <Trash size={20} />
            Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default NoteMenu
