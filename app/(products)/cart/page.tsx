import { createClient } from "@/utils/supabase/server";
import CartTableServer from "./CartTableServer";
import CartTableClient from "./CartTableClient";

export default async function Cart() {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) {
    console.error(error);
  }

  return <>{user ? <CartTableServer /> : <CartTableClient />}</>;
}
