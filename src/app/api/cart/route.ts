import { NextResponse } from 'next/server';

export async function GET() {
  // This function will run on the client side
  const getCartItems = `
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    return cartItems;
  `;

  return NextResponse.json({ script: getCartItems }, { status: 200 });
}