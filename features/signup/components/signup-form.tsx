import React from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

export default function SignupForm() {
	const formSchema = z
		.object({
			userName: z.string().min(5).max(50),
			email: z.string().min(2).max(50).email(),
			password: z.string().min(4),
			confirmPassword: z.string().min(4),
		})
		.refine((data) => data.password === data.confirmPassword, {
			message: "Passwörter stimmen nicht überein",
			path: ["confirmPassword"],
		});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			userName: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});
	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
	}

	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
					{/* formfield userName*/}
					<FormField
						control={form.control}
						name="userName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Benutzername</FormLabel>
								<FormControl>
									<Input type="text" placeholder="JohnDoe" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					{/* formfield email*/}
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input type="email" placeholder="m@example.com" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					{/* formfield password*/}
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Passwort</FormLabel>

								<FormControl>
									<Input type="password" placeholder="" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					{/* formfield confirmPassword*/}
					<FormField
						control={form.control}
						name="confirmPassword"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Passwort bestätigen</FormLabel>

								<FormControl>
									<Input type="password" placeholder="" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* submit button */}
					<Button type="submit" className="w-full">
						Konto erstellen
					</Button>
				</form>
			</Form>
		</>
	);
}
