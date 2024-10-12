"use server";
import { createClient } from "@/utils/supabase/server";

export default async function Cart() {
  //if there is a user get the items in their cart
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) {
    //get items through state
    console.error(error);
    return;
  }

  interface CartItem {
    quantity: number;
    products: { name: string; price: number; image_url: string };
  }

  const { data: rawData, error: err } = await supabase
    .from("cart_items")
    .select("quantity, products!product_id(name, price, image_url)")
    .eq("user_id", user.id);
  if (err) {
    console.error(err);
    return;
  }

  // Type assertion to treat products as a single object
  const data = rawData?.map((item) => {
    return {
      quantity: item.quantity,
      products: item.products as unknown as {
        name: string;
        price: number;
        image_url: string;
      },
    };
  });

  return (
    <div>
      {data.map((item) => (
        <div key={item.products.name} className="mt-2">
          <p>{item.products.name}</p>
          <p>{item.quantity}</p>
          <p>{item.products.price}</p>
        </div>
      ))}
    </div>
  );
}
