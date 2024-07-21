"use client";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { formatCurrency } from "@/lib/formatters";
import { useFormState } from "react-dom";
import { addOrder } from "@/app/(customerFacing)/_actions/purchase";

type CartModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function CartModal({ isOpen, onClose }: CartModalProps) {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    getTotalPrice,
  } = useCart();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [error, action] = useFormState(addOrder.bind(null), {});

  const handleSubmit = () => {
    setShowForm(false);
    clearCart();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center mb-2"
              >
                <span>{item.name}</span>
                <div className="flex items-center">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="bg-red-100 hover:bg-customRed rounded-md w-6"
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="bg-red-100 hover:bg-customRed rounded-md w-6"
                  >
                    +
                  </button>
                </div>
                <span>
                  {formatCurrency((item.priceInCents * item.quantity) / 100)}
                </span>
                <Button
                  onClick={() => removeFromCart(item.id)}
                  variant="destructive"
                  size="sm"
                  className=" bg-customRed text-white hover:bg-red-700"
                >
                  Remove
                </Button>
              </div>
            ))}
            <div className="font-bold mt-4">
              Total: {formatCurrency(getTotalPrice() / 100)}
            </div>
            {!showForm ? (
              <Button
                onClick={() => setShowForm(true)}
                className="mt-4 w-full bg-customRed text-white hover:bg-red-700"
              >
                Proceed to Checkout
              </Button>
            ) : (
              <form action={action} className="mt-4" onSubmit={handleSubmit}>
                <Input
                  type="text"
                  placeholder="Enter your name"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="mb-2"
                />
                <Input
                  type="email"
                  id="emailO"
                  name="emailO"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mb-2"
                />
                <Input
                  type="hidden"
                  name="pricePaid"
                  value={getTotalPrice() / 100}
                />
                <Button
                  type="submit"
                  className="w-full  bg-customRed text-white hover:bg-red-700"
                >
                  Complete Order
                </Button>
              </form>
            )}
          </>
        )}
        <Button
          onClick={onClose}
          variant="outline"
          className="mt-4 w-full bg-customRed text-white hover:bg-red-700"
        >
          Close
        </Button>
      </div>
    </div>
  );
}
