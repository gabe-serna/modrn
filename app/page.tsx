import Hero from "@/components/hero";
import Image from "next/image";
import HeroImage from "@/public/hero-image.png";

export default async function Index() {
  return (
    <>
      <h1 className="text-6xl">Luxury Home Goods</h1>
      <Image
        src={HeroImage}
        alt="Luxury Office Image"
        className="opacity-40 w-full absolute top-0 left-0 z-0"
      />
    </>
  );
}
