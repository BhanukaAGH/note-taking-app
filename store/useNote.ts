import { create } from 'zustand'

import { Note } from '@/types'
import { notes } from '@/data/notes'

type NoteStore = {
  notes: Note[]
  isNew: boolean
  isEdit: boolean
  isSearch: boolean
  searchResults: Note[]
  activeIndex: number | null
  removeNote: () => void
  createNewNote: () => void
  saveNote: (data: { title: string; content: string }) => void
  openNote: (index: number) => void
  setIsEdit: (state: boolean) => void
  setIsSearch: (val: boolean) => void
  searchNotes: (keyword: string) => void
}

export const useNoteStore = create<NoteStore>((set) => ({
  notes: notes,
  isNew: false,
  isEdit: false,
  isSearch: false,
  searchResults: [],
  activeIndex: null,
  openNote: (index) => set({ activeIndex: index, isEdit: false, isNew: false }),
  setIsEdit: (state) => set({ isEdit: state }),
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

  createNewNote: () => {
    const newNote: Note = {
      title: '',
      content: '',
      createdAt: new Date(),
    }

    set((state) => ({
      isNew: true,
      isEdit: true,
      notes: [...state.notes, newNote],
      activeIndex: state.notes.length,
    }))
  },
  saveNote: async (data) => {
    set((state) => ({
      isEdit: false,
      notes: state.notes.map((note, index) => {
        if (index === state.activeIndex) {
          note.title = data.title
          note.content = data?.content || ''
        }

        return note
      }),
    }))
  },
  removeNote: async () => {
    const notes = useNoteStore.getState().notes
    const activeIndex = useNoteStore.getState().activeIndex

    set((state) => ({
      notes: state.notes.filter(
        (note, index) =>
          (state.isNew && activeIndex === index) ||
          note.id !== notes[activeIndex!].id
      ),
      activeIndex: null,
    }))
  },
}))
