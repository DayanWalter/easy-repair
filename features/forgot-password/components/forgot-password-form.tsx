"use client";
import React from "react";
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

export default function ForgotPasswordForm() {
  const { toast } = useToast();
  const router = useRouter();

  const formSchema = z.object({
    email: z.string().email("Invalid email address"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const supabase = createClient();

    const { data, error } = await supabase.auth.resetPasswordForEmail(
      values.email,
      {
        redirectTo: `${process.env.NEXT_PUBLIC_AUTH_CALLBACK_URL}?redirect_to=/reset-password`,
      },
    );

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred. Please try again.",
      });
      return;
    }

    toast({
      title: "Email Sent",
      description: "Check your inbox for further instructions.",
    });
    router.push("/login");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="mail@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Reset Password
        </Button>
      </form>
    </Form>
  );
}
