"use client";
import LoginForm from "@/components/login-form/login-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Login() {
	return (
		<div className="flex items-center justify-center py-12">
			<div className="mx-auto grid w-[350px] gap-6">
				<div className="grid gap-2 text-center">
					<h1 className="text-3xl font-bold">Login</h1>
					<p className="text-balance text-muted-foreground">
						Enter your email below to login to your account
					</p>
				</div>

				{/* form */}
				<LoginForm />
				{/* end of form */}

				<Button variant="outline" className="w-full">
					Login with Google
				</Button>
				<div className="mt-4 text-center text-sm">
					Don&apos;t have an account?{" "}
					<Link href="/signup" className="underline">
						Sign up
					</Link>
				</div>
			</div>
		</div>
	);
}
