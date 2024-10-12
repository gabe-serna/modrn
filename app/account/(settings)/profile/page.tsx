"use client";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

interface InfoProps {
  email: string | undefined;
  phone: string | undefined;
}

const Profile = () => {
  const supabase = useMemo(() => createClient(), []);
  const [info, setInfo] = useState({} as InfoProps);

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;
      const phone = user.phone || "none";
      setInfo({
        email: user.email as string,
        phone: phone,
      });
    };
    fetchProfile();
  }, []);

  return (
    <section className="grid w-3/4 gap-6">
      <header className="border-b border-gold-800 pb-8">
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="font-sans text-muted-foreground">
          This is your user information
        </p>
      </header>
      <main className="grid gap-6">
        <figure>
          <figcaption className="text-xl font-bold">Email</figcaption>
          {info.email ? (
            <p className="font-sans text-sm text-muted-foreground">
              {info.email}
            </p>
          ) : (
            <Loading />
          )}
        </figure>
        <figure className="mt-2">
          <figcaption className="text-xl font-bold">Phone</figcaption>
          {info.phone === "none" ? (
            <p className="font-sans text-sm italic text-stone-500">
              No Phone Number Added
            </p>
          ) : info.phone ? (
            <p className="font-sans text-sm text-muted-foreground">
              {info.phone}
            </p>
          ) : (
            <Loading />
          )}
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
};

export default Profile;

import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return <Skeleton className="h-[20px] w-1/4 rounded-full" />;
};
