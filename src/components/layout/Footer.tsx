"use client"
import React from 'react';
import Link from 'next/link';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-background text-foreground border-t border-border mt-50">
      <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand + blurb + newsletter */}
          <div>
            <Link href="/" className="inline-block">
              <div className="text-2xl font-bold font-display">LION&apos;S DEN</div>
            </Link>
            <p className="mt-3 text-sm text-foreground/80 max-w-xs">
              Premium gear at roaring prices. Discover quality products and exclusive deals every day.
            </p>

            {/* Newsletter */}
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-5 max-w-sm"
              aria-label="Newsletter signup"
            >
              <label htmlFor="newsletter-email" className="block text-sm font-medium mb-2">
                Join our newsletter
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="you@example.com"
                  className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  autoComplete="email"
                  required
                />
                <button
                  type="submit"
                  className="rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  Subscribe
                </button>
              </div>
              <p className="mt-2 text-xs text-foreground/70">
                By subscribing, you agree to our Terms and Privacy Policy.
              </p>
            </form>
          </div>

          {/* Shop */}
          <nav aria-label="Shop" className="text-sm">
            <h3 className="font-semibold text-base">Shop</h3>
            <ul className="mt-3 space-y-2">
              <li><Link className="hover:underline text-foreground/80" href="/products">All Products</Link></li>
              <li><Link className="hover:underline text-foreground/80" href="/category">Categories</Link></li>
              <li><Link className="hover:underline text-foreground/80" href="/products">New Arrivals</Link></li>
              <li><Link className="hover:underline text-foreground/80" href="/products">Best Sellers</Link></li>
              <li><Link className="hover:underline text-foreground/80" href="/products">On Sale</Link></li>
            </ul>
          </nav>

          {/* Help */}
          <nav aria-label="Help" className="text-sm">
            <h3 className="font-semibold text-base">Help</h3>
            <ul className="mt-3 space-y-2">
              <li><Link className="hover:underline text-foreground/80" href="/login">Your Account</Link></li>
              <li><Link className="hover:underline text-foreground/80" href="/cart">Cart</Link></li>
              <li><Link className="hover:underline text-foreground/80" href="/checkout">Checkout</Link></li>
              <li><Link className="hover:underline text-foreground/80" href="/contact">Support</Link></li>
              <li><Link className="hover:underline text-foreground/80" href="/about">FAQs</Link></li>
            </ul>
          </nav>

          {/* Company */}
          <nav aria-label="Company" className="text-sm">
            <h3 className="font-semibold text-base">Company</h3>
            <ul className="mt-3 space-y-2">
              <li><Link className="hover:underline text-foreground/80" href="/about">About Us</Link></li>
              <li><Link className="hover:underline text-foreground/80" href="/contact">Contact</Link></li>
              <li><Link className="hover:underline text-foreground/80" href="/category">Our Categories</Link></li>
              <li><a className="hover:underline text-foreground/80" href="#" aria-disabled>Careers</a></li>
              <li><a className="hover:underline text-foreground/80" href="#" aria-disabled>Blog</a></li>
            </ul>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-foreground/70">
          <p>&copy; {year} LION&apos;S DEN. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:underline">Privacy Policy</Link>
            <Link href="#" className="hover:underline">Terms of Service</Link>
            <Link href="#" className="hover:underline">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;