import { create } from 'zustand'

import { Note } from '@/types'
import { notes } from '@/data/notes'

type NoteStore = {
  notes: Note[]
  isSearch: boolean
  searchResults: Note[]
  activeIndex: number | null
  openNote: (index: number) => void
  setIsSearch: (val: boolean) => void
  searchNotes: (keyword: string) => void
}

export const useNoteStore = create<NoteStore>((set) => ({
  notes: notes,
  isSearch: false,
  searchResults: [],
  activeIndex: null,
  openNote: (index) => set({ activeIndex: index }),
  setIsSearch: (val) => set({ isSearch: val }),
  searchNotes: (keyword) =>
    set((state) => ({
      searchResults:
        keyword === ''
          ? state.notes
          : state.notes.filter(
              (note) =>
                note.title.toLowerCase().includes(keyword.toLowerCase()) ||
                note.content.toLowerCase().includes(keyword.toLowerCase())
            ),
    })),
}))
