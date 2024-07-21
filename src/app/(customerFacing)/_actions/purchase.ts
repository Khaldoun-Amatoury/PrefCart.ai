"use server"

import db from "@/db/db";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { z } from "zod";

const addSchema = z.object({
  emailO:z.string().email(),
  pricePaid:z.coerce.number().min(1),
  name:z.string().min(1)
})

export async function addOrder(
  prevState: unknown,
  formData: FormData
) {
  const parsedData = Object.fromEntries(formData.entries());
  console.log('Parsed data:', parsedData);

  const result = addSchema.safeParse(parsedData);
  if (!result.success) {
    console.error('Validation error:', result.error.errors);
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;
  console.log('Data received:', data)

  let user = await db.user.findUnique({
    where: {
      email: data.emailO,
    },
  });

  if (!user) {
    user = await db.user.create({
      data: {
        email: data.emailO,
        name: data.name,
      },
    });
    console.log('User created:', user);
  } else {
    console.log('User found:', user);
  }

  console.log('creating order with:',{
    emailO:data.emailO,
    pricePaidInCents:data.pricePaid,
  })

  try {
    await db.order.create({
      data:{
        emailO: data.emailO,
        pricePaidInCents: data.pricePaid,
        name:data.name
      }
    })
    console.log('Order added successfully');
  } catch (error) {
    console.error('Error adding order:', error);
    throw error
  }

  revalidatePath('/admin/orders')
  redirect('/thank-you')
}
