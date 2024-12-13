import { redirect } from "next/navigation";

// Global Components
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Features
import { createCustomer } from "@/features/customers/";
import Header from "@/components/header/header";
import NewCustomerForm from "@/features/customers/components/new/customer-new-customer-form";

export default function NewCustomer() {
	const breadcrumbItems = [
		{ href: "/customers", label: "Kunden" },
		{ href: "/customers/newcustomer", label: "Neuer Kunde" },
	];

	return (
		<>
			<Header breadcrumbItems={breadcrumbItems} />
			<NewCustomerForm />
		</>
	);
}
