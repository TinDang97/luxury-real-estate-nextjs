import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

// Initialize Resend conditionally
const resend = process.env.RESEND_API_KEY 
  ? new Resend(process.env.RESEND_API_KEY) 
  : null;

export async function POST(req: NextRequest) {
  try {
    const { email, name, phone, projectTitle } = await req.json();

    // Phone is required, email is optional
    if (!phone) {
      return NextResponse.json({ error: 'Phone number is required' }, { status: 400 });
    }

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    // If email is provided and Resend is configured, send email
    if (email && resend) {
      const { data, error } = await resend.emails.send({
        from: 'VN Luxury <onboarding@resend.dev>', // Only works for verified domains or test mode
        to: [email],
        subject: `Welcome to ${projectTitle || 'The Global City'} | Information Inside`,
        html: `
          <div style="font-family: sans-serif; color: #333;">
            <h1>Hello ${name || 'Valued Guest'},</h1>
            <p>Thank you for your interest in <strong>${projectTitle || 'The Global City'}</strong>.</p>
            <p>As the new downtown of Southeast Asia, we offer unparalleled luxury and investment opportunities.</p>
            <p>
              <a href="https://masterisehomes.com/the-global-city" style="display:inline-block; background: #c5a059; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 4px;">Learn More</a>
            </p>
            <p>Our sales team will contact you shortly via phone (${phone})${email ? ` or email (${email})` : ''}.</p>
            <hr />
            <p style="font-size: 12px; color: #888;">VN Luxury Realty</p>
          </div>
        `,
      });

      if (error) {
        console.warn('Resend email error:', error);
        // Don't fail the whole request if email fails
      }
    } else if (!resend) {
      console.warn('Resend API Key is missing. Email not sent.');
    }

    // Always return success if phone and name are provided
    return NextResponse.json({ 
      success: true, 
      message: 'Registration successful. We will contact you soon.',
      contactInfo: {
        name,
        phone,
        email: email || null,
        projectTitle
      }
    });

  } catch (error) {
    console.error('Registration API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
