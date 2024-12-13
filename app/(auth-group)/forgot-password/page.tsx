"use client";
import ForgotPasswordForm from "@/features/forgot-password/components/forgot-password-form";
import Link from "next/link";

export default function ForgotPassword() {
	return (
		<div className="flex items-center justify-center py-12">
			<div className="mx-auto grid w-[350px] gap-6">
				<div className="grid gap-2 text-center">
					<h1 className="text-3xl font-bold">Passwort zurücksetzen</h1>
					<p className="text-balance text-muted-foreground">
						Geben Sie Ihre E-Mail-Adresse ein, um Ihr Passwort zurückzusetzen
					</p>
				</div>

				{/* form */}
				<ForgotPasswordForm />
				{/* end of form */}

				<div className="mt-4 text-center text-sm">
					Zurück zur{" "}
					<Link href="/login" className="underline">
						Anmeldung
					</Link>
				</div>
			</div>
		</div>
	);
}
