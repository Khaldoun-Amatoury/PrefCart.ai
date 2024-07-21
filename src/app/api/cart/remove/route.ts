import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id');
  if (!id) {
    return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
  }

  // This function will run on the client side
  const removeFromCart = `
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    const updatedCart = cartItems.filter(item => item.productId !== '${id}');
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  `;

  return NextResponse.json(
    { message: 'Item removed from cart', script: removeFromCart },
    { status: 200 }
  );
}