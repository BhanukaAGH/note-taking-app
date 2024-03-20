'use client'

import React, { useEffect, useRef } from 'react'
import { CalendarDays, CircleCheck } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useNoteStore } from '@/store/useNote'
import { toast } from 'sonner'
import { z } from 'zod'

import { Form, FormControl, FormField, FormItem } from '../ui/form'
import { Input } from '../ui/input'
import NoteMenu from '../note/NoteMenu'
import Editor from '../editor/Editor'
import NoteEmpty from './NoteEmpty'

const formSchema = z.object({
  title: z
    .string({ required_error: 'title is missing' })
    .min(1, { message: 'title is missing' })
    .trim(),
  content: z.string().max(10000, { message: 'Note is too long.' }).trim()
})

const Note = () => {
  const inputRef = useRef<React.ElementRef<'input'>>(null)
  const activeIndex = useNoteStore((state) => state.activeIndex)
  const notes = useNoteStore((state) => state.notes)
  const isEdit = useNoteStore((state) => state.isEdit)
  const saveNote = useNoteStore((state) => state.saveNote)

  const form = useForm<{ title: string; content: string }>({
    mode: 'onChange',
    defaultValues: {
      title: '',
      content: ''
    }
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const data = formSchema.safeParse(values)
    if (!data.success) {
      data.error.issues.forEach((issue) => {
        toast.error(issue.message)
      })

      return
    }

    saveNote(data.data)
  }

  // when the active note index changes, update the form values
  useEffect(() => {
    if (activeIndex !== null) {
      form.setValue('title', notes[activeIndex].title)
      form.setValue('content', notes[activeIndex].content)
      if (isEdit) {
        inputRef.current?.focus()
      }
    }
  }, [activeIndex, notes, form, isEdit])

  if (activeIndex === null) return <NoteEmpty />

  return (
    <div className='mx-auto flex max-w-4xl flex-col'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-7'>
          <div className='flex items-center justify-between'>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem className='w-full pr-3'>
                  <FormControl>
                    <Input
                      {...field}
                      ref={inputRef}
                      disabled={!isEdit}
                      placeholder='Enter title'
                      className='truncate border-none bg-transparent px-0 text-3xl font-semibold text-white focus-visible:ring-0 focus-visible:ring-offset-0'
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {isEdit ? (
              <button type='submit'>
                <CircleCheck
                  size={30}
                  className='cursor-pointer text-muted-foreground ring-0 hover:text-green-500'
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
              {new Date(notes[activeIndex].createdAt!).toLocaleDateString()}
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
