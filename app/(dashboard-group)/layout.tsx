import type React from "react";

// Global Components
import NavBar from "@/components/navbar/navbar";
import Avatar from "@/components/avatar/avatar";

export default async function DashboardGroupLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<NavBar />
			<div className="flex flex-col sm:gap-2 py-4 pl-14">
				<div className="flex justify-end px-6">
					<Avatar />
				</div>
				<div className="flex-1">{children}</div>
			</div>
		</>
	);
}
