import { db } from '@/lib/db'

export const PUT = async (
  req: Request,
  { params }: { params: { noteId: number } }
) => {
  try {
    const { title, content } = await req.json()

    await db.note.update({
      where: {
        id: params.noteId.toString()
      },
      data: { title, content }
    })

    return Response.json('Note updated successfully.')
  } catch (error) {
    return Response.json(
      { message: 'Failed to update the note. Please try again later.' },
      { status: 500 }
    )
  }
}

export const DELETE = async (
  req: Request,
  { params }: { params: { noteId: number } }
) => {
  try {
    await db.note.delete({
      where: {
        id: params.noteId.toString()
      }
    })

    return Response.json('Note deleted successfully.')
  } catch (error) {
    return Response.json(
      { message: 'Failed to delete the note. Please try again later.' },
      { status: 500 }
    )
  }
}
