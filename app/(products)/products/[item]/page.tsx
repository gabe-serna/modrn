import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import CheckoutForm from "../CheckoutForm";

interface Props {
  params: { item: string };
}

export default async function Product({ params }: Props) {
  let { item } = params;
  item = item.replace(/%20/g, " ");

  const supabase = createClient();
  const { data, error } = await supabase
    .from("products")
    .select("id, name, description, price, available_stock, image_url")
    .eq("name", item)
    .single();

  if (error || !data) {
    console.error(error);
  }
  return (
    <div className="flex justify-around p-20">
      {data && (
        <>
          <Image
            src={data.image_url}
            alt={data.name}
            width={450}
            height={450}
            priority
          />
          <div className="inline h-min max-w-[clamp(40ch,_35%,_65ch)]">
            <h1 className="text-3xl font-bold">{data.name}</h1>
            <p className="text-xl text-gold-400">${data.price}</p>
            <p className="mt-4 min-w-[45ch] max-w-[75ch] font-sans text-sm text-muted-foreground">
              {data.description}
            </p>
            {data.available_stock <= 50 ? (
              <p className="mt-2 inline-block font-sans text-sm italic text-gold-600">
                <b>{data.available_stock}</b> left in stock
              </p>
            ) : (
              <p className="mt-2 inline-block font-sans text-sm italic text-gold-600">
                In stock
              </p>
            )}
            <CheckoutForm id={data.id} />
          </div>
        </>
      )}
    </div>
  );
}
