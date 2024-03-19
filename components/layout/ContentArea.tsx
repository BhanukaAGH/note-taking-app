'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Form, FormControl, FormField, FormItem } from '../ui/form'
import { CalendarDays } from 'lucide-react'
import { Input } from '../ui/input'
import NoteMenu from '../Note/NoteMenu'

const formSchema = z.object({
  title: z
    .string({ required_error: 'title is missing' })
    .min(1, { message: 'title is missing' })
    .trim(),
  content: z.string().max(10000, { message: 'Note is too long.' }).trim(),
})

const ContentArea = () => {
  const form = useForm<{ title: string; content: string }>({
    mode: 'onChange',
    defaultValues: {
      title: '',
      content: '',
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values)
  }

  return (
    <div className='h-full w-full bg-[#1C1C1C] p-12'>
      <div className='flex flex-col max-w-4xl mx-auto'>
        <Form {...form}>
          <form className='space-y-7'>
            <div className='flex items-center justify-between'>
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder='Enter title'
                        {...field}
                        className='font-semibold text-white text-3xl border-none bg-transparent px-0 focus-visible:ring-0 focus-visible:ring-offset-0'
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <NoteMenu />
            </div>
            <div className='grid grid-cols-8 text-sm'>
              <div className='col-span-2 flex items-center gap-x-3 text-gray-400'>
                <CalendarDays size={18} />
                <span>Date</span>
              </div>
              <div className='col-span-6 flex items-center text-white'>
                {new Date().toLocaleDateString()}
              </div>
            </div>
            <FormField
              control={form.control}
              name='content'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder='Enter content'
                      {...field}
                      className='font-semibold text-white text-3xl border-none bg-transparent px-0 focus-visible:ring-0 focus-visible:ring-offset-0'
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </div>
  )
}

export default ContentArea
