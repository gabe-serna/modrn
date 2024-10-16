import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function Login({ searchParams }: { searchParams: Message }) {
  return (
    <form className="my-20 flex min-w-64 flex-1 flex-col">
      <h1 className="text-3xl font-bold">Sign in</h1>
      <p className="font-sans text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link
          className="font-medium text-muted-foreground underline"
          href="/sign-up"
        >
          Sign up
        </Link>
      </p>
      <div className="mt-8 flex flex-col gap-2 [&>input]:mb-3">
        <Label htmlFor="email" className="text-lg">
          Email
        </Label>
        <Input name="email" placeholder="you@example.com" required />
        <div className="flex items-center justify-between">
          <Label htmlFor="password" className="text-lg">
            Password
          </Label>
          <Link
            className="font-sans text-xs text-muted-foreground underline"
            href="/reset-password"
          >
            Forgot Password?
          </Link>
        </div>
        <Input
          type="password"
          name="password"
          placeholder="Your password"
          required
        />
        <SubmitButton pendingText="Signing In..." formAction={signInAction}>
          Sign in
        </SubmitButton>
        <FormMessage message={searchParams} />
      </div>
    </form>
  );
}
