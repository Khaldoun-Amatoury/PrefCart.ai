import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { productId, quantity, price } = await request.json();

  // This function will run on the client side
  const addToCart = `
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItemIndex = cartItems.findIndex(item => item.productId === '${productId}');
    if (existingItemIndex > -1) {
      cartItems[existingItemIndex].quantity += ${quantity};
    } else {
      cartItems.push({ productId: '${productId}', quantity: ${quantity}, price: ${price} });
    }
    localStorage.setItem('cart', JSON.stringify(cartItems));
  `;

  return NextResponse.json(
    { message: 'Item added to cart', script: addToCart },
    { status: 200 }
  );
}