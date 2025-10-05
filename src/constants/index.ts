// Re-export centralized theme constants
export * from "./colors";
export * from "./fonts";

export const SlidesData = [
	{
		id: 1,
		title: "Discover the Wild",
		image: "/images/slide1.jpg",
		description: "Explore our exclusive collection of wildlife gear and apparel.",
		cta: "Shop Now",
		url: "/collections/wildlife",
		bgColor: "bg-gradient-to-r from-green-400 to-blue-500 text-white",
	},
	{
		id: 2,
		title: "Adventure Awaits",
		image: "/images/slide2.jpg",
		description: "Gear up for your next adventure with our top-quality outdoor equipment.",
		cta: "Explore Gear",
		url: "/collections/adventure",
		bgColor: "bg-gradient-to-r from-green-400 to-blue-500 text-white",
	},
	{
		id: 3,
		title: "Sustainable Choices",
		image: "/images/slide3.jpg",
		description: "Join us in making a difference with our eco-friendly products.",
		cta: "Go Green",
		url: "/collections/sustainable",
		bgColor: "bg-gradient-to-r from-green-400 to-blue-500 text-white",
	},
] as const;

export default SlidesData;
