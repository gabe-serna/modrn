import ItemPreview from "@/components/ItemPreview";
import { supabaseAdmin } from "@/utils/supabase/server";

interface Props {
  params: { item: string };
}

export default async function Product({ params }: Props) {
  let { item } = params;
  item = item.replace(/%20/g, " ");

  const { data, error } = await supabaseAdmin
    .from("products")
    .select("name, description, price, amount_in_stock, image_url")
    .eq("name", item)
    .single();

  if (error || !data) {
    console.error(error);
  }
  return (
    <div>
      {data && (
        <ItemPreview
          key={data.name}
          title={data.name}
          image={data.image_url}
          price={data.price}
        />
      )}
    </div>
  );
}
