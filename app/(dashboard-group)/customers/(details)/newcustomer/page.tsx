// Features
import Header from "@/components/header/header";
import NewCustomerForm from "@/features/customers/components/new/customer-new-customer-form";

export default function NewCustomer() {
  const breadcrumbItems = [
    { href: "/customers", label: "Customers" },
    { href: "/customers/newcustomer", label: "New Customer" },
  ];

  return (
    <>
      <Header breadcrumbItems={breadcrumbItems} />
      <NewCustomerForm />
    </>
  );
}
