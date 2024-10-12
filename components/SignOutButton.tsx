"use client";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

const SignOutButton = () => {
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
    } else {
      window.location.href = "/";
    }
  };

  return (
    <button
      type="button"
      onClick={handleSignOut}
      className="mt-0.5 w-min font-sans text-sm text-stone-400 transition-colors hover:text-stone-500"
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
