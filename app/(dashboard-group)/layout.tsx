import type React from "react";
import NavBar from "@/components/navbar/navbar";
import supabase from "@/database/supabaseClient";
export default function DashboardGroupLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	console.log(supabase);
	return (
		<>
			<NavBar />
			<div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">{children}</div>
		</>
	);
}
