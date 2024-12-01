import Header from "@/components/header/header";
import NewOrderForm from "@/features/orders/components/new/order-new-order-form";

export default function NewOrder() {
	const breadcrumbItems = [
		{ href: "/orders", label: "Bestellungen" },
		{ href: "/orders/neworder", label: "Neue Bestellung" },
	];

	return (
		<>
			<Header breadcrumbItems={breadcrumbItems} />
			<NewOrderForm />
		</>
	);
}
