// Features
import Header from "@/components/header/header";
import NewProductForm from "@/features/products/components/new/product-new-product-form";

export default function NewProduct() {
  const breadcrumbItems = [
    { href: "/products", label: "Products" },
    { href: "/products/newproduct", label: "New Product" },
  ];

  return (
    <>
      <Header breadcrumbItems={breadcrumbItems} />
      <NewProductForm />
    </>
  );
}
