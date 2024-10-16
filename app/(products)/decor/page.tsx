import { createClient } from "@/utils/supabase/server";
import ItemPreview from "@/components/ItemPreview";

const Office = async () => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("products")
    .select("name, price, image_url")
    .eq("category", "decor");

  if (error || !data) {
    console.error(error);
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {data?.map((item) => (
        <ItemPreview
          key={item.name}
          title={item.name}
          image={item.image_url}
          price={item.price}
        />
      ))}
    </div>
  );
};

export default Office;
