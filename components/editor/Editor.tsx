'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import Placeholder from '@tiptap/extension-placeholder'
import Highlight from '@tiptap/extension-highlight'
import StarterKit from '@tiptap/starter-kit'
import Toolbar from './Toolbar'
import { useNoteStore } from '@/store/useNote'
import { useEffect } from 'react'

interface EditorProps {
  content: string
  onChange: (richText: string) => void
}

const Editor = ({ content, onChange }: EditorProps) => {
  const activeIndex = useNoteStore((state) => state.activeIndex)
  const notes = useNoteStore((state) => state.notes)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      Placeholder.configure({
        placeholder: 'Write here...',
      }),
    ],
    content: content,
    editorProps: {
      attributes: {
        class:
          'w-full h-[calc(100vh-350px)] sm:h-[calc(100vh-290px)] md:h-[calc(100vh-280px)] text-white focus:outline-none overflow-hidden overflow-y-scroll no-scrollbar',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  useEffect(() => {
    // Ensure the editor instance exists and has not been destroyed
    if (editor && !editor.isDestroyed && activeIndex !== null) {
      editor?.commands?.setContent(notes[activeIndex].content)
    }
  }, [editor, activeIndex, notes])

  return (
    <div className='flex flex-col gap-y-7'>
      {editor && <Toolbar editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  )
}

export default Editor
