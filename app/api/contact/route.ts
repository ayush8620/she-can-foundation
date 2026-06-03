import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { contactFormSchema } from '@/lib/validations'
import { rateLimit } from '@/lib/rate-limit'

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? 'unknown'

    if (!rateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await req.json()
    const validated = contactFormSchema.safeParse(body)

    if (!validated.success) {
      return NextResponse.json(
        { error: 'Invalid form data', details: validated.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const submission = await prisma.submission.create({
      data: {
        name: validated.data.name,
        email: validated.data.email,
        message: validated.data.message,
      },
    })

    return NextResponse.json(
      { message: 'Form Submitted Successfully', id: submission.id },
      { status: 201 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const submissions = await prisma.submission.findMany({
      orderBy: { createdAt: 'desc' },
    })

    const total = submissions.length
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const todayCount = submissions.filter(
      (s) => new Date(s.createdAt) >= today
    ).length

    return NextResponse.json({ submissions, total, todayCount })
  } catch (error) {
    console.error('Fetch submissions error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch submissions' },
      { status: 500 }
    )
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Submission ID required' }, { status: 400 })
    }

    await prisma.submission.delete({ where: { id } })

    return NextResponse.json({ message: 'Submission deleted successfully' })
  } catch (error) {
    console.error('Delete submission error:', error)
    return NextResponse.json(
      { error: 'Failed to delete submission' },
      { status: 500 }
    )
  }
}
