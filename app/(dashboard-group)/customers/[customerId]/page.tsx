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
import {
	readCustomer,
	updateCustomer,
	deleteCustomer,
} from "@/features/customers";
import Header from "@/components/header/header";
import SingleCustomerForm from "@/features/customers/components/single/customer-single-customer-form";

type Props = {
	params: {
		customerId: string;
	};
};

export default async function SingleCustomer({ params }: Props) {
	const customer = await readCustomer(params.customerId);

	if (!customer) {
		// TODO: add real ui
		return <div>Customer not found</div>;
	}

	const breadcrumbItems = [
		{
			label: "Kunden",
			href: "/customers",
		},
		{
			label: customer?.name || "",
			href: `/customers/${customer?.id}`,
		},
	];

	return (
		<>
			<Header breadcrumbItems={breadcrumbItems} />
			<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
				<div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
					<div className="grid xl:grid-cols-2">
						<Card className="" x-chunk="dashboard-05-chunk-0">
							<SingleCustomerForm customer={customer} params={params} />
						</Card>
					</div>
				</div>
			</main>
		</>
	);
}
