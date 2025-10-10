"use client"
import React from 'react';
import Link from 'next/link';
import Menu from './menu';
import NavbarIcons from './NavbarIcons';
import Image from 'next/image';
import { useCart } from '../cart/cart-context';

const Header = () => {
  const { count } = useCart();

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b border-border">
      <div className="h-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex items-center">
        <div className="w-full grid grid-cols-3 items-center">
          {/* Left: Logo */}
          <div className="justify-self-start">
            <Link href="/" className="shrink-0">
              <div className="text-2xl font-bold font-display text-foreground">
                LION&apos;S DEN
              </div>
            </Link>
          </div>

          {/* Center: Desktop navigation */}
          <nav aria-label="Primary" className="hidden md:flex items-center gap-6 text-sm justify-self-center">
            <Link href="/" className="text-foreground/70 hover:text-foreground transition-colors">Home</Link>
            <Link href="/products" className="text-foreground/70 hover:text-foreground transition-colors">Shop All</Link>
            <Link href="/category" className="text-foreground/70 hover:text-foreground transition-colors">Category</Link>
            <Link href="/about" className="text-foreground/70 hover:text-foreground transition-colors">About</Link>
            <Link href="/contact" className="text-foreground/70 hover:text-foreground transition-colors">Contact</Link>
          </nav>

          {/* Right: Actions */}
          <div className="justify-self-end flex items-center gap-2">
            {/* Desktop icons + search */}
            <NavbarIcons />

            {/* Mobile cart icon */}
            <Link
              href="/cart"
              className="md:hidden relative p-2 rounded-md hover:bg-muted/30 focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label="Shopping Cart"
            >
              <Image src="/icons/shopping%20cart.svg" alt="" width={24} height={24} aria-hidden="true" />
              <span className="absolute -top-1.5 -right-1.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center" aria-label="Cart items count">{count}</span>
            </Link>

            {/* Mobile menu toggle */}
            <Menu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;