import Image from "next/image";
import HeroImage from "@/public/hero-image.png";

export default async function Index() {
  return (
    <div className="mt-40 h-[calc(100vh-5rem)] box-border">
      <h1 className="text-8xl opacity-100 z-10 text-center [text-shadow:_0_4px_8px_rgb(0_0_0/_0.8)]">
        Luxury Home Goods
      </h1>
      <h2 className="mt-4 text-3xl font-sans text-stone-400 italic text-center [text-shadow:_0_4px_12px_rgb(0_0_0/_0.8)] ">
        Crafting Luxury, Redefining Lifestyle
      </h2>
      <Image
        src={HeroImage}
        alt="Luxury Office Image"
        className="opacity-30 h-full object-cover absolute top-0 left-0 -z-10"
      />
    </div>
  );
}
