"use client";
import { useState } from "react";
import { usePathname } from 'next/navigation';
import { Dialog, Popover } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavbarCartButton } from "@/components/NavbarCartButton";
import { CartModal } from "@/components/CartModal";
import Link from 'next/link';

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

export default function Header(): JSX.Element {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const pathname = usePathname();

  const handleCartClick = (): void => {
    setIsCartOpen(true);
    console.log("Cart opened");
  };

  const isActive = (path: string): boolean => pathname === path;

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About us" },
    { href: "/products", label: "Products" },
    { href: "/recommendations", label: "Recommendations" },
    { href: "/feedback", label: "Feedback" },
    { href: "/contact", label: "Contact Us" },
  ];

  return (
    <header className="bg-customRed h-14">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-6 ml-1.5">
            <span className="sr-only">PrefCart</span>
            <img
              className="h-8 w-auto mt-1"
              src="/PrefCartLogoWhite.png"
              alt="PrefCart Logo"
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-6 inline-flex items-center justify-center rounded-md p-2.5 text-black"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden -mt-1 lg:flex lg:gap-x-12">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-base font-semibold leading-6 ${
                isActive(link.href) ? 'text-black' : 'text-white hover:text-black'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="-mx-3 px-3">
            <NavbarCartButton onClick={handleCartClick} />
          </div>
        </Popover.Group>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">PrefCart</span>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-black"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 ${
                      isActive(link.href) ? 'text-black bg-gray-50' : 'text-black hover:bg-gray-50 hover:text-customRed'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="-mx-3 px-3 py-2">
                  <NavbarCartButton onClick={() => setIsCartOpen(true)} />
                </div>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
      <CartModal 
        isOpen={isCartOpen} 
        onClose={() => {
          setIsCartOpen(false);
          console.log("Cart closed");
        }} 
      />
    </header>
  );
}