// "use client";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Order, Product } from "@prisma/client";
// import { useEffect, useState } from "react";
// import { addOrder } from "../_actions/purchase";
// import { useFormState } from "react-dom";
// import { Button } from "@/components/ui/button";

// export default function PurchaseForm({
//   order,
//   productId,
//   productPrice
// }: {
//   order: Order | null;
//   productId: string;
//   productPrice: number;
// }) {
//   const [error, action] = useFormState(addOrder.bind(null, productId), {});

//   const [email, setEmail] = useState<string | undefined>(order?.emailO);
//   const [name, setName] = useState<string | undefined>(order?.name);
//   const [quantity, setQuantity] = useState<number>(1);
//   const [totalPrice, setTotalPrice] = useState<number>(0);

//   useEffect(() => {
//     setTotalPrice(quantity * productPrice);
//   }, [quantity, productPrice]);

//   const increaseQuantity = () => setQuantity((prev) => prev + 1);
//   const decreaseQuantity = () =>
//     setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

//   return (
//     <form action={action}>
//       <h1></h1>
//       <Label htmlFor="emailO">Email</Label>
//       <Input
//         type="text"
//         id="emailO"
//         name="emailO"
//         required
//         value={email || ""}
//         placeholder="Enter your email"
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <Label htmlFor="name">Full Name</Label>
//       <Input
//         type="text"
//         id="name"
//         name="name"
//         required
//         value={name || ""}
//         placeholder="Enter your name"
//         onChange={(e) => setName(e.target.value)}
//       />

//       <div>
//         <Label htmlFor="quantity">Quantity</Label>
//         <div>
//           <button type="button" onClick={decreaseQuantity}>
//             -
//           </button>
//           <span>{quantity}</span>
//           <button type="button" onClick={increaseQuantity}>
//             +
//           </button>
//         </div>
        
//       </div>

//       <Label htmlFor="totalPrice">Total Price: {totalPrice}</Label>
//       <Input type="hidden" name="productId" value={productId}/>
//       <Input type="hidden" name="pricePaid" value={totalPrice}/>
//       <Input type="hidden" name="quantity" value={quantity}/>
//       <Button type="submit" className="flex mt-4">Purchase</Button>
//     </form>
//   );
// }
