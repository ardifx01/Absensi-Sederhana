"use client";

import React from "react";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { authClient } from "@/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const LogoutButton = () => {
  const router = useRouter();

  async function handleLogout() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
          toast.success("Berhasil keluar", {
            description: "Selamat tinggal, nanti datang lagi ya",
          });
        },
      },
    });
  }
  return (
    <DropdownMenuItem onClick={handleLogout}>
      <LogOut />
      Keluar
    </DropdownMenuItem>
  );
};

export default LogoutButton;
