"use client";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

interface InfoProps {
  email: string | undefined;
  phone: string | undefined;
}

const Billing = () => {
  // const supabase = useMemo(() => createClient(), []);
  // const [info, setInfo] = useState({} as InfoProps);

  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     const {
  //       data: { user },
  //     } = await supabase.auth.getUser();
  //     if (!user) return;
  //     const phone = user.phone || "none";
  //     setInfo({
  //       email: user.email as string,
  //       phone: phone,
  //     });
  //   };
  //   fetchProfile();
  // }, []);

  return (
    <section className="grid w-3/4 gap-6">
      <header className="border-b border-gold-800 pb-8">
        <h1 className="text-2xl font-bold">Billing</h1>
        <p className="font-sans text-stone-400">
          Manage your billing information
        </p>
      </header>
      <main className="grid gap-6">
        <figure className="mt-2">
          <figcaption className="text-xl font-bold">Card Details</figcaption>
          <p className="font-sans text-sm text-stone-400">*********</p>
        </figure>
      </main>
    </section>
  );
};

export default Billing;

import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return <Skeleton className="h-[20px] w-1/4 rounded-full" />;
};
