"use client"
import React from 'react';
import Image from 'next/image';
import SearchBar from "./SearchBar";
import CartModal from "../cart/CartModel";
import { useState } from 'react';
import { useRouter } from "next/navigation";
import { useCart } from "../cart/CartContext";

const NavbarIcons = () => {
    const router = useRouter();
    const { itemCount } = useCart();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);

    //Temporary logged in state
    const isloggedIn = false

    const handleProfile=() => {
        if (!isloggedIn) {
            router.push('/login');
        }
        setIsProfileOpen( (isProfileOpen)=>(!isProfileOpen));
    }

    const handleCart = () => {
        setIsCartOpen(true);
    }

    const closeCart = () => {
        setIsCartOpen(false);
    }

  return (
    <>
      <div className="relative hidden md:flex items-center gap-4">
        {/* Search field */}
          <SearchBar/>

        {/* Account button */}
        <button
          type="button"
          aria-label="User Account"
          className="cursor-pointer p-2 rounded-md hover:bg-muted/30 focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <Image
              src="/icons/account_profile.svg"
              alt=""
              width={24}
              height={24}
              onClick={handleProfile}
              aria-hidden="true" />

            {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-background border border-border rounded-md shadow-lg py-1 z-20">
                    <a href="/profile" className=" block px-4 py-2 text-sm text-foreground hover:bg-muted/10">Profile</a>
                    <a href="/orders" className="block px-4 py-2 text-sm text-foreground hover:bg-muted/10">Orders</a>
                    <a href="/settings" className="block px-4 py-2 text-sm text-foreground hover:bg-muted/10">Settings</a>
                    <a href="/logout" className="block px-4 py-2 text-sm text-foreground hover:bg-muted/10">Logout</a>
                </div>
            )}
        </button>

        {/* Cart button */}
        <button
          type="button"
          aria-label="Shopping Cart"
          className="cursor-pointer p-2 rounded-md hover:bg-muted/30 focus:outline-none focus:ring-2 focus:ring-ring relative"
          onClick={handleCart}
        >
          <Image src="/icons/shopping%20cart.svg" alt="" width={24} height={24} aria-hidden="true" />
          {itemCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center" aria-label={`Cart items count: ${itemCount}`}>{itemCount}</span>
          )}
        </button>
      </div>

      {/* Cart Modal */}
      <CartModal isOpen={isCartOpen} onClose={closeCart} size="responsive" overlay={false} />
    </>
  );
};

export default NavbarIcons;