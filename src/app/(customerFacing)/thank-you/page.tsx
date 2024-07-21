import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ThankYouPage() {
  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Thank You for Your Order!</h1>
      <p className="mb-4">Your order has been received and is being processed.</p>
      <Link href="/">
        <Button><Link href="/">Return to Home</Link></Button>
      </Link>
    </div>
  );
}