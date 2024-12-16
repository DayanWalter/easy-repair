"use client";

import { Breadcrumb } from "@/components/breadcrumb/breadcrumb";

// import Avatar from "@/components/avatar/avatar";
import type { BreadcrumbItem } from "@/types";

export default function Header({
  breadcrumbItems,
}: {
  breadcrumbItems: BreadcrumbItem[];
}) {
  return (
    <header className="px-6 pb-4">
      <Breadcrumb items={breadcrumbItems} />
    </header>
  );
}
