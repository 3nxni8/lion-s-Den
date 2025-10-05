"use client"

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const SearchBar: React.FC = () => {
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = (formData.get('name')?.toString() || '').trim();

    // Navigate to products with a search query; products page can read searchParams later
    if (name.length > 0) {
      const params = new URLSearchParams({ query: name });
      router.push(`/products?${params.toString()}`);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="relative hidden md:flex items-center w-56 lg:w-80"
      role="search"
      aria-label="Site search"
    >
      <button
        type="submit"
        aria-label="Search"
        className="absolute inset-y-0 left-2 flex items-center text-muted-foreground"
      >
        <Image
          src="/icons/search_icon.svg"
          alt=""
          width={18}
          height={18}
          aria-hidden="true"
        />
      </button>
      <input
        type="text"
        name="name"
        placeholder="Search products..."
        className="w-full rounded-md border border-border bg-background pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        autoComplete="off"
        aria-label="Search products"
      />
    </form>
  );
};

export default SearchBar;