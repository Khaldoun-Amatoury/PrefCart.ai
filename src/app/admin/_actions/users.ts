"use server"

import db from "@/db/db"
import { z } from "zod"
import { notFound } from "next/navigation"
import { revalidatePath } from "next/cache"

const addUserSchema = z.object({
  email:z.string().min(1)
})

export async function deleteUser(id: string) {
  const user = await db.user.delete({
    where: { id },
  })

  if (user == null) return notFound()

  return user
}

export async function addUser(email:string,name:string,formData:FormData){
  const result = addUserSchema.safeParse(Object.fromEntries(formData.entries()))
  if (result.success === false) {
    return result.error.formErrors.fieldErrors
  }

  const data = result.data;
  const user = await db.user.findUnique({where:{email}});

  if (user !== null) return;

  await db.user.create({
    data:{
      email:email,
      name:name
    },
  })

  revalidatePath("/")
  revalidatePath("/admin")
}