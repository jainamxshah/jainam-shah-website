import { NextResponse } from 'next/server';
import { Resend } from 'resend';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    const body: ContactFormData = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Initialize Resend
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    // Send email via Resend
    // NOTE: In Resend, you MUST verify your domain (e.g. jainamshah.com) 
    // to send emails from it. If your domain is NOT yet verified, 
    // you should use 'onboarding@resend.dev' for testing.
    const { data, error: resendError } = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: ['jainams471@gmail.com'],
      subject: `New Contact from ${body.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${body.name}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <h3>Message:</h3>
        <p>${body.message}</p>
      `,
    });

    if (resendError) {
      console.error('Resend API Error:', resendError);
      throw new Error(`Resend failed: ${resendError.message}`);
    }

    // Log for now (remove in production)
    console.log('Contact form submission sent via Resend:', data);

    return NextResponse.json(
      { message: 'Form submitted successfully', data },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Contact form error details:', {
      message: error.message,
      stack: error.stack
    });
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}


