import { useCart } from '@/contexts/CartContext';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

export function NavbarCartButton({ onClick }: { onClick: () => void }) {
  const { cart } = useCart();

  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <button
      onClick={onClick}
      className="relative text-white hover:text-black"
    >
      <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-white text-customRed rounded-full text-xs w-5 h-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </button>
  );
}