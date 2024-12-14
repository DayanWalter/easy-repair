"use client";
import { LoginForm } from "@/features/login";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";

export default function Login() {
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
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-balance text-muted-foreground">
            Enter your email below to log in to your account
          </p>
        </div>
        <LoginForm />
        <Button onClick={handleSignIn} variant="outline" className="w-full">
          Sign in with Github
        </Button>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?
          <Link href="/signup" className="underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
