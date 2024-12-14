import Header from "@/components/header/header";
import NewOrderForm from "@/features/orders/components/new/order-new-order-form";

export default function NewOrder() {
  const breadcrumbItems = [
    { href: "/orders", label: "Orders" },
    { href: "/orders/neworder", label: "New Order" },
  ];

  return (
    <>
      <Header breadcrumbItems={breadcrumbItems} />
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <NewOrderForm />
      </main>
    </>
  );
}
