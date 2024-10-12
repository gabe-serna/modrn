import { resetPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default async function ResetPassword({
  searchParams,
}: {
  searchParams: Message;
}) {
  return (
    <form className="my-16 flex min-w-64 max-w-64 flex-col">
      <h1 className="text-3xl font-bold">Reset Password</h1>
      <p className="font-sans text-sm text-muted-foreground">
        Please enter your new password below.
      </p>
      <div className="flex flex-col gap-2 [&>input]:mb-3">
        <Label htmlFor="password" className="mt-8 text-lg">
          New Password
        </Label>
        <Input
          type="password"
          name="password"
          placeholder="New password"
          className="font-sans placeholder:text-muted-foreground focus-visible:ring-gold-500"
          minLength={6}
          required
        />
        <Label htmlFor="confirmPassword" className="text-lg">
          Confirm Password
        </Label>
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          className="font-sans placeholder:text-muted-foreground focus-visible:ring-gold-500"
          minLength={6}
          required
        />
        <SubmitButton formAction={resetPasswordAction}>
          Reset Password
        </SubmitButton>
        <FormMessage message={searchParams} />
      </div>
    </form>
  );
}
