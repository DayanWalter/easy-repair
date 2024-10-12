import Link from "next/link";
import {
	Breadcrumb as BreadcrumbRoot,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";

interface BreadcrumbItemProp {
	href: string;
	label: string;
}

interface BreadcrumbProps {
	items: BreadcrumbItemProp[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
	return (
		<BreadcrumbRoot className="hidden md:flex">
			<BreadcrumbList>
				{items.map((item, index) => (
					<React.Fragment key={item.href}>
						<BreadcrumbItem>
							{index === items.length - 1 ? (
								<BreadcrumbPage>{item.label}</BreadcrumbPage>
							) : (
								<BreadcrumbLink asChild>
									<Link href={item.href}>{item.label}</Link>
								</BreadcrumbLink>
							)}
						</BreadcrumbItem>
						{index < items.length - 1 && <BreadcrumbSeparator />}
					</React.Fragment>
				))}
			</BreadcrumbList>
		</BreadcrumbRoot>
	);
}
