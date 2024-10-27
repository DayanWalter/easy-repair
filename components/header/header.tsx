"use client";

import { Breadcrumb } from "@/components/breadcrumb/breadcrumb";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
// import Avatar from "@/components/avatar/avatar";
import type { BreadcrumbItem } from "@/types";

export default function Header({
	breadcrumbItems,
}: {
	breadcrumbItems: BreadcrumbItem[];
}) {
	return (
		<header className=" px-6 pb-4 ">
			<Breadcrumb items={breadcrumbItems} />
		</header>
	);
}
