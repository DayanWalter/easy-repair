import React from "react";
import Link from "next/link";

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
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function LoginForm() {
	const router = useRouter();
	const { toast } = useToast();
	const formSchema = z.object({
		email: z.string().email(),
		password: z.string().min(6).max(50),
	});
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});
	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		const supabase = createClient();
		console.log(values);
		const { data, error } = await supabase.auth.signInWithPassword({
			email: values.email,
			password: values.password,
		});
		console.log(data, error);
		// Check if user is authenticated
		if (data?.user?.aud === "authenticated") {
			toast({
				variant: "default",
				title: "Willkommen!",
				description: "Sie werden weitergeleitet.",
			});
			router.push("/");
		}
		// If error is invalid_credentials, show error message
		if (error?.code === "invalid_credentials") {
			console.log(error.code);
			toast({
				variant: "destructive",
				title: "Validierungsfehler",
				description: "Falscher Benutzername oder Passwort.",
			});
		}
	};

	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
					{/* formfield email*/}
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										type="email"
										placeholder="mail@example.com"
										{...field}
									/>
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
								<div className="flex items-center">
									<FormLabel>Passwort</FormLabel>
									<Link
										href="/forgot-password"
										className="ml-auto inline-block text-sm underline"
									>
										Passwort vergessen?
									</Link>
								</div>

								<FormControl>
									<Input type="password" placeholder="" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* submit button */}
					<Button type="submit" className="w-full">
						Anmelden
					</Button>
				</form>
			</Form>
		</>
	);
}
