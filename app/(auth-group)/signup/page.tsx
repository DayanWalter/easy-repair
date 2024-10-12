"use client";
import RegisterForm from "@/components/register-form/register-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Register() {
	return (
		<div className="flex items-center justify-center py-12">
			<div className="mx-auto grid w-[350px] gap-6">
				<div className="grid gap-2 text-center">
					<h1 className="text-3xl font-bold">Create your account</h1>
					<p className="text-balance text-muted-foreground">
						Enter your data below to create an account
					</p>
				</div>

				{/* form */}
				<RegisterForm />
				{/* end of form */}
				<Button variant="outline" className="w-full">
					Continue with Google
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
