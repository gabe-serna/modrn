//this form will add the product to the cart
//and will redirect to the cart page where
//the user can see the products in the cart
//and proceed to checkout if they want or
//return to shopping

//if the user is not logged in, they will be
//redirected to the login page, and once they log in
//they will be redirected back to the checkout page
"use client";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CartContext, CartItem } from "@/components/CartProvider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AuthSessionMissingError } from "@supabase/supabase-js";

interface Props {
  id: number;
  maxStock?: number | null;
}

const formSchema = z.object({
  quantity: z
    .number()
    .gte(1, { message: "Quantity must be at least 1" })
    .lte(10, { message: "Quantity must be at most 10" }),
});

const CheckoutForm = ({ id, maxStock = null }: Props) => {
  const { toast } = useToast();
  const router = useRouter();
  const { cart, setCart } = useContext(CartContext);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quantity: 1,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const supabase = createClient();

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error && !(error instanceof AuthSessionMissingError)) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred. Please try again later.",
      });
      return;
    }
    if (!user) {
      // Add to Cart for Anonymous User
      const { data, error: err } = await supabase
        .from("products")
        .select(
          "id, name, price, image_url, available_stock, category, stripe_price_id",
        )
        .eq("id", id)
        .single();
      if (err) {
        console.error(err);
        toast({
          variant: "destructive",
          title: "Error",
          description:
            "An error occurred while adding the product to the cart.",
        });
        return;
      }
      const product = {
        id: data.id as number,
        name: data.name as string,
        price: data.price as number,
        image_url: data.image_url as string,
        available_stock: data.available_stock as number,
        category: data.category as string,
        stripe_price_id: data.stripe_price_id as string,
      };
      setCart([
        ...cart,
        { id: id, quantity: values.quantity, products: product },
      ]);
      router.push("/cart");
      return;
    }

    //Add to Cart for Authenticated User
    const { error: err } = await supabase
      .from("cart_items")
      .insert([
        { user_id: user.id, product_id: id, quantity: values.quantity },
      ]);

    if (err) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred while adding the product to the cart.",
      });
    } else {
      router.push("/cart");
    }
  }

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem className="mt-8">
              <FormLabel className="text-lg font-bold">Quantity</FormLabel>
              <FormControl>
                <Input
                  placeholder="shadcn"
                  type="number"
                  min={1}
                  max={maxStock ?? 10}
                  {...field}
                  className="font-sans"
                  onChange={(e) => {
                    field.onChange(parseInt(e.target.value));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="bg-gold-500 text-lg font-bold text-background hover:bg-gold-600"
        >
          Add to Cart
        </Button>
      </form>
    </Form>
  );
};

export default CheckoutForm;
