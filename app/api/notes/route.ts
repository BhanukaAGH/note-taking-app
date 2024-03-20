import { db } from '@/lib/db'

export const GET = async () => {
  try {
    const data = await db.note.findMany()
    return Response.json(data)
  } catch (error) {
    return Response.json({ message: 'Failed to fetch notes.' })
  }
}

export const POST = async (req: Request) => {
  try {
    const { title, content } = await req.json()

    if (!title) {
      return Response.json({ message: 'title is required' }, { status: 400 })
    }

    const data = await db.note.create({
      data: { title, content: content ?? '' }
    })

    return Response.json(data)
  } catch (error) {
    return Response.json(
      { message: 'Failed to create the note. Please try again later.' },
      { status: 500 }
    )
  }
}
