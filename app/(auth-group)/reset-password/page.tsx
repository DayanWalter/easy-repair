"use client";
import ResetPasswordForm from "@/features/reset-password/components/reset-password-form";
import Link from "next/link";

export default function ResetPassword() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Set New Password</h1>
          <p className="text-balance text-muted-foreground">
            Enter your new password
          </p>
        </div>

        <ResetPasswordForm />

        <div className="mt-4 text-center text-sm">
          Back to{" "}
          <Link href="/login" className="underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
