"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { CartItem } from "@/components/CartProvider";
import { stripe } from "@/utils/stripe/server";

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const origin = headers().get("origin");

  if (!email || !password) {
    return { error: "Email and password are required" };
  }
  const supabase = createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/sign-up", error.message);
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
  const origin: string = headers().get("origin") as string;
  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
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
