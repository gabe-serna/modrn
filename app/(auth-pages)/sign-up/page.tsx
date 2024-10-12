import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function Signup({ searchParams }: { searchParams: Message }) {
  if ("message" in searchParams) {
    return (
      <div className="flex h-screen w-full flex-1 items-center justify-center gap-2 p-4 sm:max-w-md">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <>
      <form className="my-20 flex min-w-64 max-w-64 flex-col">
        <h1 className="text-3xl font-bold">Sign up</h1>
        <p className="font-sans text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            className="font-medium text-muted-foreground underline"
            href="/sign-in"
          >
            Sign in
          </Link>
        </p>
        <div className="mt-8 flex flex-col gap-2 [&>input]:mb-3">
          <Label htmlFor="email" className="text-lg">
            Email
          </Label>
          <Input
            name="email"
            placeholder="you@example.com"
            className="font-sans"
            required
          />
          <Label htmlFor="password" className="text-lg">
            Password
          </Label>
          <Input
            type="password"
            name="password"
            placeholder="Your password"
            className="font-sans"
            minLength={6}
            required
          />
          <SubmitButton formAction={signUpAction} pendingText="Signing up...">
            Sign up
          </SubmitButton>
          <FormMessage message={searchParams} />
        </div>
      </form>
    </>
  );
}
