import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { REGISTRATIONS_COLLECTION, Registration, RegistrationStatus, RegistrationSource } from '@/types/registration';

// Initialize Resend conditionally
const resend = process.env.RESEND_API_KEY 
  ? new Resend(process.env.RESEND_API_KEY) 
  : null;

export async function POST(req: NextRequest) {
  try {
    const { email, name, phone, projectTitle } = await req.json();

    // Basic validation
    if (!phone) {
      return NextResponse.json({ error: 'Phone number is required' }, { status: 400 });
    }

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    // Prepare registration data using the typed schema
    const registrationData: Omit<Registration, 'id'> = {
      name,
      phone,
      email: email || null,
      projectTitle: projectTitle || 'The Global City',
      status: 'new' as RegistrationStatus,
      source: 'website_form' as RegistrationSource,
      userAgent: req.headers.get('user-agent') || 'unknown',
      ip: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown',
      createdAt: serverTimestamp() as any, // Firestore serverTimestamp
      updatedAt: serverTimestamp() as any,
    };

    // Save to Firestore
    let firestoreId = null;
    try {
      const docRef = await addDoc(collection(db, REGISTRATIONS_COLLECTION), registrationData);
      firestoreId = docRef.id;
      console.log('Registration saved to Firestore with ID:', firestoreId);
    } catch (firestoreError) {
      console.error('Firestore save error:', firestoreError);
      // We continue even if Firestore fails to try and send the email/return success
      // In a production app, you might want to handle this more robustly
    }

    // If email is provided and Resend is configured, send email
    if (email && resend) {
      try {
        const { data, error } = await resend.emails.send({
          from: 'VN Luxury <onboarding@resend.dev>', // Only works for verified domains or test mode
          to: [email],
          subject: `Welcome to ${projectTitle || 'The Global City'} | Information Inside`,
          html: `
            <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
              <h1 style="color: #0c1a2c;">Hello ${name || 'Valued Guest'},</h1>
              <p>Thank you for your interest in <strong>${projectTitle || 'The Global City'}</strong>.</p>
              <p>As the new downtown of Southeast Asia, we offer unparalleled luxury and investment opportunities.</p>
              <div style="margin: 30px 0;">
                <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'https://vn-luxury.realty'}/projects/${(projectTitle || 'the-global-city').toLowerCase().replace(/\s+/g, '-')}" 
                   style="display:inline-block; background: #c5a059; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">
                  Learn More
                </a>
              </div>
              <p>Our sales team will contact you shortly via phone (<strong>${phone}</strong>)${email ? ` or email (<strong>${email}</strong>)` : ''}.</p>
              <hr style="border: 0; border-top: 1px solid #eee; margin: 40px 0 20px;" />
              <p style="font-size: 12px; color: #888;">VN Luxury Realty | Bất Động Sản Cao Cấp Việt Nam</p>
            </div>
          `,
        });

        if (error) {
          console.warn('Resend email error:', error);
        }
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
      }
    }

    // Return success
    return NextResponse.json({ 
      success: true, 
      message: 'Registration successful. We will contact you soon.',
      id: firestoreId,
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
