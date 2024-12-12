"use client";

import { Card } from "@/components/ui/card";
import Avatar from "@/components/avatar/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FormItem } from "@/components/ui/form";

export default function Settings() {
	const [email, setEmail] = useState("user@example.com");
	const [name, setName] = useState("Max Mustermann");

	return (
		<div className="container mx-auto py-8">
			<h1 className="text-2xl font-bold mb-6">Einstellungen</h1>

			<div className="space-y-6">
				{/* Profil Einstellungen */}
				<Card className="p-6">
					<h2 className="text-xl font-semibold mb-4">Profil</h2>
					<div className="flex items-center gap-4 mb-6">
						<Avatar />
						<Button variant="outline">Profilbild ändern</Button>
					</div>

					<div className="space-y-4">
						<div>
							<Label htmlFor="name">Name</Label>
							<Input
								id="name"
								value={name}
								onChange={(e) => setName(e.target.value)}
								className="max-w-md"
							/>
						</div>
						<div>
							<Label htmlFor="email">E-Mail</Label>
							<Input
								id="email"
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="max-w-md"
							/>
						</div>
					</div>
				</Card>

				{/* Export Einstellungen */}
				<Card className="p-6">
					<h2 className="text-xl font-semibold mb-4">Daten & Export</h2>
					<div className="space-y-4">
						<div>
							<Button variant="outline" className="mr-3">
								Produkte exportieren
							</Button>
							<Button variant="outline">Kunden exportieren</Button>
						</div>
						<p className="text-sm text-muted-foreground">
							Exportieren Sie Ihre Daten im CSV-Format für die Verwendung in
							anderen Anwendungen.
						</p>
					</div>
				</Card>

				{/* Benachrichtigungen */}
				<Card className="p-6">
					<h2 className="text-xl font-semibold mb-4">Benachrichtigungen</h2>
					<div className="space-y-4">
						<div className="flex items-center space-x-2">
							<Checkbox id="emailNotifications" />
							<Label htmlFor="emailNotifications">
								E-Mail Benachrichtigungen
							</Label>
						</div>
						<div className="flex items-center space-x-2">
							<Checkbox id="marketingEmails" />
							<Label htmlFor="marketingEmails">Marketing E-Mails</Label>
						</div>
					</div>
				</Card>
			</div>
		</div>
	);
}
