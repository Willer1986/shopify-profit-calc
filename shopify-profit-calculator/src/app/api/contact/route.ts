import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({
  email:   z.string().email(),
  subject: z.string().min(2).max(200),
  message: z.string().min(10).max(5000),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = schema.parse(body)

    // In production: send via Resend, SendGrid, Postmark, or SMTP
    // For now we log and can wire up any email service
    console.log('[CONTACT]', data)

    // Example with Resend (npm install resend):
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: 'noreply@shopifyprofitcalculator.com',
    //   to: 'hello@shopifyprofitcalculator.com',
    //   subject: `[Contact] ${data.subject}`,
    //   text: `From: ${data.email}\n\n${data.message}`,
    // })

    return NextResponse.json({ success: true })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input. Please check all fields.' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 })
  }
}
