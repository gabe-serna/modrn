import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function Profile() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    console.log("No user found!");
    return;
  }

  const { data: stripe_customers } = await supabase
    .from("stripe_customers")
    .select("name, stripe_customer_id")
    .eq("user_id", user.id)
    .single();

  return (
    <section className="grid w-3/4 gap-6">
      <header className="border-b border-gold-800 pb-8">
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="font-sans text-muted-foreground">
          This is your user information
        </p>
      </header>
      <main className="grid gap-12">
        <figure>
          <figcaption className="text-xl font-bold">Name</figcaption>
          <p className="font-sans text-sm text-muted-foreground">
            {stripe_customers?.name}
          </p>
        </figure>
        <figure>
          <figcaption className="text-xl font-bold">Email</figcaption>
          <p className="font-sans text-sm text-muted-foreground">
            {user.email}
          </p>
        </figure>
        <figure className="mt-2">
          <figcaption className="text-xl font-bold">Phone</figcaption>
          {user.phone ? (
            <p className="font-sans text-sm text-muted-foreground">
              {user.phone}
            </p>
          ) : (
            <p className="font-sans text-sm italic text-stone-500">
              No Phone Number Added
            </p>
          )}
        </figure>
        <figure className="mt-2">
          <figcaption className="text-xl font-bold">
            Stripe Customer Id
          </figcaption>
          <p className="font-sans text-sm text-muted-foreground">
            {stripe_customers?.stripe_customer_id || "No Stripe Customer Id"}
          </p>
        </figure>
        <figure className="mt-2">
          <figcaption className="text-xl font-bold">Password</figcaption>
          <p className="font-sans text-sm text-muted-foreground">*********</p>
          <Link href="/account/reset-password" className="text-gold-500">
            Forgot Password?
          </Link>
        </figure>
      </main>
    </section>
  );
}
