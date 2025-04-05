import React from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";
import { Breadcrumbs } from "./breadcrumbs";
import { ModeToggle } from "@/components/ui/theme-mode";

export default function Header() {
  return (
    <header className="flex sticky h-16 shrink-0 top-0 items-center justify-between gap-2">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumbs />
      </div>

      <div className="flex items-center gap-2 px-4">
        <ModeToggle />
      </div>
    </header>
  );
}
