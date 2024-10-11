import Link from "next/link";
import SettingsNav from "./SettingsNav";

interface Props {
  children: React.ReactNode;
}

export default function Dashboard({ children }: Props) {
  return (
    <div className="flex min-h-[calc(100vh_-_theme(spacing.16))] w-[calc(100vw-12px)] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
      <div className="mx-auto grid w-full gap-1">
        <h1 className="text-3xl font-bold">Your Account</h1>
        <p className="font-sans text-stone-400">
          Manage your account settings and preferences.
        </p>
      </div>
      <div className="mx-auto grid w-full items-start gap-6 border-t border-t-gold-800 pt-8 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <SettingsNav />
        {children}
      </div>
    </div>
  );
}
