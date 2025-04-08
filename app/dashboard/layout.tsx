import AppSidebar from "@/components/dashboard/app-sidebar";
import Header from "@/components/dashboard/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import type { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Hadirin",
  description: "Aplikasi absensi murid sederhana (LSP)",
  authors: [
    {
      name: "Hanya npc",
    },
  ],
//   icons: {
//     icon: "/.png",
//   },
};



export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <SidebarInset>
        <Header />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
