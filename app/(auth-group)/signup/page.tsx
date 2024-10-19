"use client";
import RegisterForm from "@/components/register-form/register-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Register() {
	return (
		<div className="flex items-center justify-center py-12">
			<div className="mx-auto grid w-[350px] gap-6">
				<div className="grid gap-2 text-center">
					<h1 className="text-3xl font-bold">Erstellen Sie Ihr Konto</h1>
					<p className="text-balance text-muted-foreground">
						Geben Sie unten Ihre Daten ein, um ein Konto zu erstellen
					</p>
				</div>

				{/* form */}
				<RegisterForm />
				{/* end of form */}
				<Button variant="outline" className="w-full">
					Mit Google fortfahren
				</Button>
				<div className="mt-4 text-center text-sm">
					Haben Sie bereits ein Konto?{" "}
					<Link href="/login" className="underline">
						Anmelden
					</Link>
				</div>
			</div>
		</div>
	);
}
