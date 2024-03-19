import { CircleEllipsis, Pencil, Trash } from 'lucide-react'
import { useNoteStore } from '@/store/useNote'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

const NoteMenu = () => {
  const setIsEdit = useNoteStore((state) => state.setIsEdit)
  const removeNote = useNoteStore((state) => state.removeNote)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <CircleEllipsis
          size={30}
          className='text-muted-foreground cursor-pointer hover:text-white ring-0'
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-56 mt-2 bg-neutral-700 text-white border-none'
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
            className='flex items-center gap-4 py-3 focus:text-white focus:bg-destructive'
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
