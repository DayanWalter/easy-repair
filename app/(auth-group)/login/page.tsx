"use client";
import LoginForm from "@/components/login-form/login-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Login() {
	return (
		<div className="flex items-center justify-center py-12">
			<div className="mx-auto grid w-[350px] gap-6">
				<div className="grid gap-2 text-center">
					<h1 className="text-3xl font-bold">Anmeldung</h1>
					<p className="text-balance text-muted-foreground">
						Geben Sie unten Ihre E-Mail ein, um sich in Ihr Konto einzuloggen{" "}
					</p>
				</div>

				{/* form */}
				<LoginForm />
				{/* end of form */}

				<Button variant="outline" className="w-full">
					Anmelden mit Google
				</Button>
				<div className="mt-4 text-center text-sm">
					Haben Sie noch kein Konto?{" "}
					<Link href="/signup" className="underline">
						Registrieren
					</Link>
				</div>
			</div>
		</div>
	);
}
