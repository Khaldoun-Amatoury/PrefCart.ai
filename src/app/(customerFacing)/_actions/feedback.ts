"use server"

import db from "@/db/db"
import { z } from "zod"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

const addSchema = z.object({
  fullName: z.string().min(1),
  emailF: z.string().email(),
  message: z.string().min(1)
})

export async function addFeedback(prevState: unknown, formData: FormData) {
  const parsedData = Object.fromEntries(formData.entries());
  console.log('Parsed data:', parsedData);

  const result = addSchema.safeParse(parsedData);
  if (!result.success) {
    console.error('Validation error:', result.error.errors);
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;
  console.log('Data received:', data);

  let user = await db.user.findUnique({
    where: {
      email: data.emailF,
    },
  });

  if (!user) {
    user = await db.user.create({
      data: {
        email: data.emailF,
        name: data.fullName,
      },
    });
    console.log('User created:', user);
  } else {
    console.log('User found:', user);
  }

  console.log('Creating feedback with:', {
    fullName: data.fullName,
    emailF: data.emailF,
    message: data.message,
  });

  try {
    await db.feedback.create({
      data: {
        fullName: data.fullName,
        emailF: data.emailF,
        message: data.message,
      },
    });
    console.log('Feedback added successfully');
  } catch (error) {
    console.error('Error adding feedback:', error);
    throw error;
  }

  revalidatePath("/feedback");
  revalidatePath("/admin");
  redirect('/');
}
