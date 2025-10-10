"use client"
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../cart/cart-context';

const NavbarIcons = () => {
  const { count } = useCart();

  return (
    <div className="relative hidden md:flex items-center gap-4">
      {/* Search field */}
      <form role="search" aria-label="Site" onSubmit={(e) => e.preventDefault()} className="w-64">
        <label htmlFor="navbar-search" className="sr-only">Search</label>
        <div className="relative">
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-muted-foreground">
            <Image src="/icons/search_icon.svg" alt="" width={18} height={18} aria-hidden="true" />
          </span>
          <input
            id="navbar-search"
            name="q"
            type="search"
            placeholder="Search products..."
            className="w-full rounded-md border border-border bg-background pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            autoComplete="off"
            aria-label="Search products"
          />
        </div>
      </form>

      {/* Account button */}
      <button
        type="button"
        aria-label="User Account"
        className="cursor-pointer p-2 rounded-md hover:bg-muted/30 focus:outline-none focus:ring-2 focus:ring-ring"
      >
        <Image src="/icons/account_profile.svg" alt="" width={24} height={24} aria-hidden="true" />
      </button>

      {/* Cart button */}
      <Link
        href="/cart"
        aria-label="Shopping Cart"
        className="cursor-pointer p-2 rounded-md hover:bg-muted/30 focus:outline-none focus:ring-2 focus:ring-ring relative"
      >
        <Image src="/icons/shopping%20cart.svg" alt="" width={24} height={24} aria-hidden="true" />
        <span className="absolute -top-1.5 -right-1.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center" aria-label="Cart items count">{count}</span>
      </Link>
    </div>
  );
};

export default NavbarIcons;