import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { email, name } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: 'VN Luxury <onboarding@resend.dev>', // Only works for verified domains or test mode
      to: [email],
      subject: 'Welcome to The Global City | Brochure Inside',
      html: `
        <div style="font-family: sans-serif; color: #333;">
          <h1>Hello ${name || 'Valued Guest'},</h1>
          <p>Thank you for your interest in <strong>The Global City</strong>.</p>
          <p>As the new downtown of Southeast Asia, we offer unparalleled luxury and investment opportunities.</p>
          <p>
            <a href="https://masterisehomes.com/the-global-city" style="display:inline-block; background: #c5a059; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 4px;">Download Brochure</a>
          </p>
          <p>Our sales team will contact you shortly.</p>
          <hr />
          <p style="font-size: 12px; color: #888;">VN Luxury Realty</p>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
