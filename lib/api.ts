import { useNoteStore } from '@/store/useNote'
import { toast } from 'sonner'

// fetches notes and updates the notes in the store
export const fetchNotes = async () => {
  const res = await fetch('/api/notes')
  const notes = await res.json()

  useNoteStore.getState().setNotes(notes)
}

// creates a new note
export const createNote = async (data: { title: string; content: string }) => {
  try {
    await fetch('/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    await fetchNotes()
    toast.success('Note created successfully')
  } catch (error: any) {
    toast.error(error.message)
  }
}

// update existing note
export const updateNote = async (
  id: string,
  data: { title?: string; content?: string }
) => {
  try {
    await fetch(`/api/notes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    await fetchNotes()
    toast.success('Note updated successfully')
  } catch (error: any) {
    toast.error(error.message)
  }
}

// delete a note by id
export const deleteNote = async (id: string) => {
  try {
    await fetch(`/api/notes/${id}`, {
      method: 'DELETE',
    })
    await fetchNotes()
    toast.success('Note deleted successfully')
  } catch (error: any) {
    toast.error(error.message)
  }
}
