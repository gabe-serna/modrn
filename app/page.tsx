import Image from "next/image";
import HeroImage from "@/public/hero-image.png";

export default async function Index() {
  return (
    <div className="box-border h-[calc(100vh-5rem)] pt-40">
      <h1 className="z-10 text-center text-8xl opacity-100 [text-shadow:_0_4px_8px_rgb(0_0_0/_0.8)]">
        Luxury Home Goods
      </h1>
      <h2 className="mt-4 text-center font-sans text-3xl italic text-muted-foreground [text-shadow:_0_4px_12px_rgb(0_0_0/_0.8)]">
        Crafting Luxury, Redefining Lifestyle
      </h2>
      <Image
        src={HeroImage}
        alt="Luxury Office Image"
        className="absolute left-0 top-0 -z-10 h-full object-cover opacity-30"
      />
    </div>
  );
}
