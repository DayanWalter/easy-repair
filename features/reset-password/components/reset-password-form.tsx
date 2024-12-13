"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

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

const formSchema = z
	.object({
		password: z.string().min(6, "Passwort muss mindestens 6 Zeichen lang sein"),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwörter stimmen nicht überein",
		path: ["confirmPassword"],
	});

export default function ResetPasswordForm() {
	const { toast } = useToast();
	const router = useRouter();
	const supabase = createClient();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			password: "",
			confirmPassword: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		const { data, error } = await supabase.auth.updateUser({
			password: values.password,
		});

		if (error) {
			toast({
				variant: "destructive",
				title: "Fehler",
				description:
					"Passwort konnte nicht geändert werden. Bitte versuchen Sie es erneut.",
			});
			return;
		}

		toast({
			title: "Erfolg",
			description: "Ihr Passwort wurde erfolgreich geändert.",
		});
		router.push("/login");
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Neues Passwort</FormLabel>
							<FormControl>
								<Input type="password" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="confirmPassword"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Passwort bestätigen</FormLabel>
							<FormControl>
								<Input type="password" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" className="w-full">
					Passwort ändern
				</Button>
			</form>
		</Form>
	);
}
