"use client";
import { useState } from "react";
import { Dialog, Popover } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavbarCartButton } from "@/components/NavbarCartButton";
import { CartModal } from "@/components/CartModal";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCartClick = () => {
    setIsCartOpen(true);
    console.log("Cart opened"); 
  };

  return (
    <header className="bg-customRed h-14">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-6 ml-1.5">
            <span className="sr-only">PrefCart</span>
            <img
              className="h-8 w-auto mt-1"
              src="/PrefCartLogoWhite.png"
              alt="PrefCart Logo"
            />
          </a>
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
          <a
            href="/"
            className="text-base font-semibold leading-6 text-white hover:text-black"
          >
            Home
          </a>
          <a
            href="/about"
            className="text-base font-semibold leading-6 text-white hover:text-black"
          >
            About us
          </a>
          <a
            href="/products"
            className="text-base font-semibold leading-6 text-white hover:text-black"
          >
            Products
          </a>
          <a
            href="/recommendations"
            className="text-base font-semibold leading-6 text-white hover:text-black"
          >
            Recommendations
          </a>

          <a
            href="/feedback"
            className="text-base font-semibold leading-6 text-white hover:text-black"
          >
            Feedback
          </a>
          <a
            href="/contact"
            className="text-base font-semibold leading-6 text-white hover:text-black justify-end"
          >
            Contact Us
          </a>
          <div className="-mx-3 px-3">
          <NavbarCartButton onClick={handleCartClick} />
          </div>
        </Popover.Group>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">PrefCart</span>
            </a>
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
                <a
                  href="/"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-black hover:bg-gray-50 hover:text-customRed"
                >
                  Home
                </a>
                <a
                  href="/about"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-black hover:bg-gray-50 hover:text-customRed"
                >
                  About us
                </a>
                <a
                  href="/products"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-black hover:bg-gray-50 hover:text-customRed"
                >
                  Products
                </a>
                <a
                  href="/recommendations"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-black hover:bg-gray-50 hover:text-customRed"
                >
                  Recommendations
                </a>

                <a
                  href="/feedback"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-black hover:bg-gray-50 hover:text-customRed"
                >
                  Feedback
                </a>

                <a
                  href="/contact"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-black hover:bg-gray-50 hover:text-customRed"
                >
                  Contact Us
                </a>
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
          console.log("Cart closed"); // Add this line for debugging
        }} 
      />
    </header>
  );
}
