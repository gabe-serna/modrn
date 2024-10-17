"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { CartItem } from "@/components/CartProvider";
import { stripe } from "@/utils/stripe/server";

export const signUpAction = async (formData: FormData) => {
  const name = formData.get("name")?.toString();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const origin = headers().get("origin");

  if (!name || !email || !password) {
    return { error: "All Fields are Required" };
  }

  // Create a new Stripe Customer
  const customer = await stripe.customers.create({
    name: name,
    email: email,
  });

  // Create a new user in Supabase
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/sign-up", error.message);
  }

  // Create a new stripe customer record in Supabase
  const { error: err } = await supabase
    .from("stripe_customers")
    .insert([
      { name: name, user_id: user?.id, stripe_customer_id: customer.id },
    ]);

  if (err) {
    console.error(err.code + " " + err.message);
    return encodedRedirect("error", "/sign-up", err.message);
  } else {
    return encodedRedirect(
      "success",
      "/success",
      "You have signed up successfully.",
    );
  }
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  return redirect("/");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const origin = headers().get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/reset-password", "Email is required");
  }

  const supabase = createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/account/forgo-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/reset-password",
      "Could not reset password",
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/reset-password",
    "Check your email for a link to reset your password.",
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/account/reset-password",
      "Password and confirm password are required",
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/account/reset-password",
      "Passwords do not match",
    );
  }

  const supabase = createClient();
  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/account/reset-password",
      "Password update failed",
    );
  }

  encodedRedirect("success", "/account/reset-password", "Password updated");
};

export const signOutAction = async () => {
  const supabase = createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};

export const createCheckoutSession = async (cartItems: CartItem[]) => {
  // Get User
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase
    .from("stripe_customers")
    .select("stripe_customer_id")
    .eq("user_id", user?.id)
    .single();

  // Create a new Checkout Session
  const origin: string = headers().get("origin") as string;
  const checkoutSession = await stripe.checkout.sessions.create({
    metadata: {
      user_id: user?.id || null,
      order_items: JSON.stringify(
        cartItems.map((item) => ({
          id: item.products.id,
          quantity: item.quantity,
          stock: item.products.available_stock,
        })),
      ),
    },
    mode: "payment",
    shipping_address_collection: { allowed_countries: ["US"] },
    shipping_options: [{ shipping_rate: "shr_1QArbsF4zz7XCw30HutlerWi" }],
    customer: data?.stripe_customer_id,
    line_items: cartItems.map((item) => ({
      price: item.products.stripe_price_id,
      quantity: item.quantity,
    })),
    success_url: `${origin}/success`,
    cancel_url: `${origin}/cart`,
  });

  return {
    client_secret: checkoutSession.client_secret,
    url: checkoutSession.url,
  };
};
