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
import { createClient } from "@/utils/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function SignupForm() {
	const { toast } = useToast();
	const router = useRouter();
	const formSchema = z
		.object({
			userName: z.string().min(5).max(50),
			email: z.string().min(2).max(50).email(),
			password: z.string().min(6),
			confirmPassword: z.string().min(6),
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
	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		const supabase = createClient();
		console.log(values);
		const { data, error } = await supabase.auth.signUp({
			email: values.email,
			password: values.password,
			options: {
				// Create new public profile
				data: {
					name: values.userName,
					user_name: values.userName,
					avatar_url: "",
				},
				emailRedirectTo: `${process.env.NEXT_PUBLIC_AUTH_CALLBACK_URL}`,
			},
		});
		console.log(data, error);
		// Check if user is authenticated
		if (data?.user?.aud === "authenticated") {
			console.log("authenticated");
			toast({
				variant: "default",
				title: "Das hat geklappt!",
				description: "Sie werden weitergeleitet.",
			});
			router.push("/login");
		}
	};

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
									<Input
										autoComplete="email"
										type="email"
										placeholder="m@example.com"
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
								<FormLabel>Passwort</FormLabel>

								<FormControl>
									<Input
										autoComplete="new-password"
										type="password"
										placeholder=""
										{...field}
									/>
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
									<Input
										autoComplete="new-password"
										type="password"
										placeholder=""
										{...field}
									/>
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
