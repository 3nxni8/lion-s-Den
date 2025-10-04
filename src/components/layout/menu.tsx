"use client"
import React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Menu =() => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <button
                type="button"
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
                aria-controls="primary-menu"
                className="cursor-pointer p-1 md:hidden"
                onClick={() => setIsOpen(open => !open)}
                onKeyDown={(e) => {
                    if (e.key === 'Escape') setIsOpen(false);
                }}
            >
                <Image
                    src={isOpen ? "/icons/closemenu.svg" : "/icons/menu_icon.svg"}
                    alt=""
                    width={28}
                    height={28}
                    aria-hidden="true"
                />
            </button>
            {isOpen && (
                <nav
                    id="primary-menu"
                    aria-label="Primary"
                    className="fixed left-0 top-20 w-full h-[calc(100vh-80px)] bg-secondary text-secondary-foreground flex flex-col items-center justify-start gap-8 py-8 text-xl z-50 md:hidden"
                    role="dialog"
                    aria-modal="true"
                >
                    <Link href="/" onClick={() => setIsOpen(false)}> HOME </Link>
                    <Link href="/products" onClick={() => setIsOpen(false)}> PRODUCTS </Link>
                    <Link href="/category" onClick={() => setIsOpen(false)}> CATEGORY </Link>
                    <Link href="/about" onClick={() => setIsOpen(false)}> ABOUT </Link>
                    <Link href="/contact" onClick={() => setIsOpen(false)}> CONTACT </Link>
                </nav>
            )}
        </div> 
    )
}

export default Menu;