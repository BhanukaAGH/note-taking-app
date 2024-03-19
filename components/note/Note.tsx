'use client'

import { useEffect } from 'react'
import { CalendarDays, CircleCheck } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useNoteStore } from '@/store/useNote'
import { z } from 'zod'

import { Form, FormControl, FormField, FormItem } from '../ui/form'
import { Input } from '../ui/input'
import NoteMenu from '../note/NoteMenu'
import Editor from '../editor/Editor'

const formSchema = z.object({
  title: z
    .string({ required_error: 'title is missing' })
    .min(1, { message: 'title is missing' })
    .trim(),
  content: z.string().max(10000, { message: 'Note is too long.' }).trim(),
})

const Note = () => {
  const activeIndex = useNoteStore((state) => state.activeIndex)
  const notes = useNoteStore((state) => state.notes)
  const isEdit = useNoteStore((state) => state.isEdit)
  const saveNote = useNoteStore((state) => state.saveNote)

  const form = useForm<{ title: string; content: string }>({
    mode: 'onChange',
    defaultValues: {
      title: '',
      content: '',
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    saveNote(values)
  }

  useEffect(() => {
    if (activeIndex !== null) {
      form.setValue('title', notes[activeIndex].title)
      form.setValue('content', notes[activeIndex].content)
    }
  }, [activeIndex, notes, form])

  if (activeIndex === null) {
    return (
      <div className='flex flex-col max-w-4xl mx-auto items-center justify-center h-full text-neutral-400'>
        <p>Create a Note By Click New Note</p>
      </div>
    )
  }

  return (
    <div className='flex flex-col max-w-4xl mx-auto'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-7'>
          <div className='flex items-center justify-between'>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={!isEdit}
                      placeholder='Enter title'
                      className='font-semibold text-white text-3xl border-none bg-transparent px-0 focus-visible:ring-0 focus-visible:ring-offset-0'
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {isEdit ? (
              <button type='submit'>
                <CircleCheck
                  size={30}
                  className='text-muted-foreground cursor-pointer hover:text-green-500 ring-0'
                />
              </button>
            ) : (
              <NoteMenu />
            )}
          </div>
          <div className='grid grid-cols-8 text-sm'>
            <div className='col-span-2 flex items-center gap-x-3 text-gray-400'>
              <CalendarDays size={18} />
              <span>Date</span>
            </div>
            <div className='col-span-6 flex items-center text-white'>
              {notes[activeIndex].createdAt!.toLocaleDateString()}
            </div>
          </div>
          <FormField
            control={form.control}
            name='content'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Editor content={field.value} onChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  )
}

export default Note
