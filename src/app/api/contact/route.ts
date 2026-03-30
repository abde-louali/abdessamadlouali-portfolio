// app/api/contact/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, email, phone, project } = await req.json();

    // Validate required fields
    if (!name || !email || !project) {
      return NextResponse.json(
        { error: 'Name, email, and project are required' },
        { status: 400 }
      );
    }

    // Create transporter using SMTP (e.g., Gmail)
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or use 'smtp.gmail.com' with port 587
      auth: {
        user: process.env.EMAIL_USER, // your email address
        pass: process.env.EMAIL_PASS, // your app password or normal password (if less secure)
      },
    });

    // Email to yourself (the admin)
    const mailToAdmin = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO, // where you want to receive inquiries
      subject: `New contact from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone || 'Not provided'}
        Project: ${project}
      `,
      html: `
        <h2>New contact form submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Project:</strong></p>
        <p>${project.replace(/\n/g, '<br/>')}</p>
      `,
    };

    // Optional: send an auto-reply to the user
    const mailToUser = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for contacting me!',
      text: `Hi ${name},\n\nThank you for reaching out. I will get back to you as soon as possible.\n\nBest regards,\nAbdessamad Louali`,
      html: `<p>Hi ${name},</p><p>Thank you for reaching out. I will get back to you as soon as possible.</p><p>Best regards,<br/>Abdessamad Louali</p>`,
    };

    // Send the emails
    await transporter.sendMail(mailToAdmin);
    await transporter.sendMail(mailToUser);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email sending failed:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}