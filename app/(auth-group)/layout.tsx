import { Wrench } from "lucide-react";
import type React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="min-h-screen w-full lg:grid lg:grid-cols-2">
        {children}
        <div className="hidden gap-5 bg-muted lg:flex lg:flex-col lg:items-center lg:justify-center">
          <Wrench className="h-16 w-16 transition-all group-hover:scale-110" />

          <h2 className="text-5xl font-semibold text-primary">EasyRepair</h2>
          <p>The place where you can organize your repair requests</p>
        </div>
      </div>
    </>
  );
}
