//this form will add the product to the cart
//and will redirect to the cart page where
//the user can see the products in the cart
//and proceed to checkout if they want or
//return to shopping

//if the user is not logged in, they will be
//redirected to the login page, and once they log in
//they will be redirected back to the checkout page
"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface Props {
  id: number;
}

const formSchema = z.object({
  quantity: z.number().gte(1, { message: "Quantity must be at least 1" }),
});

const CheckoutForm = ({ id }: Props) => {
  window.scrollTo({ top: 0 });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quantity: 1,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    console.log({ id, ...values });
  }
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
                  {...field}
                  className="font-sans"
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
