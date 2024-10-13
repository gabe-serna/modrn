import { createClient } from "@/utils/supabase/server";
import CartTableServer from "./CartTableServer";
import CartTableClient from "./CartTableClient";
import { AuthSessionMissingError } from "@supabase/supabase-js";

export default async function Cart() {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error && !(error instanceof AuthSessionMissingError)) {
    console.error(error);
  }

  return <>{user ? <CartTableServer /> : <CartTableClient />}</>;
}
