import Link from "next/link";
import Image from "next/image";
import Hero from "../components/ui/Hero";
import Banner from "../components/ui/Banner";
import { HOME_HERO, HOME_HERO_CONFIG, DEMO_PRODUCTS } from "../constants";
import ProductList from "../components/Products/Product-List";

export default function HomePage() {
  return (
    <div className="pt-20">{/* account for fixed header height */}
      <Hero {...HOME_HERO} {...HOME_HERO_CONFIG} />

      {/* Promotional Banner */}
      <div className="mt-12 md:mt-16">
        <Banner
          imageSrc="/Images/fra.jpg"
          imageAlt="New season essentials"
          title="Fresh drops, brighter days"
          description="Step into the season with bold picks and timeless staples. Limited stock on new arrivals—don’t miss out."
          cta={{ href: "/products", label: "Shop new arrivals" }}
        />
      </div>

      {/* Home product grid */}
      <section aria-label="Featured Products" className="mt-10 md:mt-14">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
          <div className="flex items-center justify-between">
            <h2 className="text-lg md:text-xl font-semibold">Featured Products</h2>
            <Link href="/products" className="text-sm text-foreground/70 hover:text-foreground">Shop all</Link>
          </div>
          <div className="mt-4">
            <ProductList products={DEMO_PRODUCTS.slice(0, 8)} />
          </div>
        </div>
      </section>
    </div>
  );
}
