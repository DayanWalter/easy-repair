"use client";
import { SignupForm } from "@/features/signup";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";

export default function Signup() {
  const supabase = createClient();
  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_AUTH_CALLBACK_URL}`,
      },
    });
  };
  return (
    <div className="flex items-center justify-center py-12">
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Create your account</h1>
          <p className="text-balance text-muted-foreground">
            Enter your details below to create an account
          </p>
        </div>

        {/* form */}
        <SignupForm />
        {/* end of form */}
        <Button onClick={handleSignIn} variant="outline" className="w-full">
          Continue with Github
        </Button>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
