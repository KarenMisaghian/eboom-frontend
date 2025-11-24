'use client';

import DashboardLayout from "@/src/components/layout-components/layout";

export default function DashboardLayoutWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DashboardLayout>{children}</DashboardLayout>;
}

