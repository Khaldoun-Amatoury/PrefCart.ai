import { NextRequest, NextResponse } from 'next/server';
import db from '@/db/db';
import { z } from 'zod';
import nodemailer from 'nodemailer';
import { redirect } from 'next/navigation';

// Validation schema
const addSchema = z.object({
  email: z.string().email(),
  pricePaid: z.coerce.number().min(1),
  name: z.string().min(1),
  products: z.array(z.object({
    name: z.string(),
    quantity: z.number().min(1),
    priceInCents: z.number().min(1),
  })),
});

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = addSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ errors: result.error.errors }, { status: 400 });
    }

    const data = result.data;

    let user = await db.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      user = await db.user.create({
        data: {
          email: data.email,
          name: data.name,
        },
      });
    }

    const order = await db.order.create({
      data: {
        emailO: data.email,
        pricePaidInCents: data.pricePaid,
        name: data.name,
      },
    });

    // Format products into a readable string
    const productList = data.products.map((product: any) => `
      <tr>
        <td>${product.name}</td>
        <td>${product.quantity}</td>
        <td>$${(product.priceInCents * product.quantity) / 100}</td>
      </tr>
    `).join('');

    const emailBody = `
      <h1>Order Confirmation</h1>
      <p>Hello ${data.name},</p>
      <p>Thank you for your order! Here are the details:</p>
      <table border="1" cellpadding="5" cellspacing="0">
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          ${productList}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2"><strong>Total</strong></td>
            <td><strong>$${data.pricePaid}</strong></td>
          </tr>
        </tfoot>
      </table>
      <p>Best regards,<br>PrefCart</p>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: data.email,
      subject: 'Order Confirmation',
      html: emailBody,
    });

    return NextResponse.json({status:200});
  } catch (error) {
    console.error('Error processing order:', error);
    return NextResponse.json({ message: 'Error processing order' }, { status: 500 });
  }
}