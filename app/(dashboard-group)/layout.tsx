import type React from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Global Components
import NavBar from "@/components/navbar/navbar";
import Avatar from "@/components/avatar/avatar";

export default async function DashboardGroupLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const supabase = createServerComponentClient({ cookies });
	const {
		data: { session },
	} = await supabase.auth.getSession();
	if (!session) {
		return redirect("/login");
	}
	return (
		<>
			<NavBar />
			<div className="flex flex-col sm:gap-2 sm:py-4 sm:pl-14">
				<div className="flex justify-end px-4 sm:px-6 ">
					<Avatar />
				</div>
				<div className="flex-1">{children}</div>
			</div>
		</>
	);
}
