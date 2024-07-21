"use server";

import { z } from "zod";
import db from "@/db/db";
import nodemailer from "nodemailer";

const schema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
});

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use TLS
  auth: {
    user: "khaldounamatoury.info@gmail.com", // Your Gmail address
    pass: "rewn fmfk czhe esqd",
  },
});

export async function addContact(prevState: any, formData: FormData) {
  const validatedFields = schema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    // Create contact in database
    await db.contact.create({
      data: {
        fullName: validatedFields.data.fullName,
        email: validatedFields.data.email,
        message: validatedFields.data.message,
      },
    });

    // Send email notification
    await transporter.sendMail({
      from: '"Your Website" <your-email@gmail.com>',
      to: "khaldounamatoury.info@gmail.com",
      subject: "New Contact Form Submission",
      text: `
        New contact form submission:
        
        Name: ${validatedFields.data.fullName}
        Email: ${validatedFields.data.email}
        Message: ${validatedFields.data.message}
      `,
      html: `
        <h2>New contact form submission:</h2>
        <p><strong>Name:</strong> ${validatedFields.data.fullName}</p>
        <p><strong>Email:</strong> ${validatedFields.data.email}</p>
        <p><strong>Message:</strong> ${validatedFields.data.message}</p>
      `,
    });

    return { message: "Contact form submitted successfully" };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return { message: "Failed to submit contact form" };
  }
}
