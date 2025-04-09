"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useSiswas } from "@/hooks/useSiswa";
import { Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export const EditButton = ({ id_siswa }: { id_siswa: number }) => {
  return (
    <DropdownMenuItem asChild>
      <Link
        href={`/dashboard/data_siswa/ubah/${id_siswa}`}
        className="flex items-center gap-2"
      >
        <Pencil size={10} color="#10b981" /> Ubah
      </Link>
    </DropdownMenuItem>
  );
};

export const DeleteButton = ({ id_siswa }: { id_siswa: number }) => {
  const { deleteSiswa } = useSiswas();

  async function handleDelete() {
    try {
      deleteSiswa({ id_siswa });
      toast.success("Berhasil menghapus", {
        description: "Anda telah menghapus data siswa",
      });
    } catch (error) {
      toast.error("Gagal menghapus", {
        description: "Ada sesuatu yang salah",
      });
    }
  }

  return (
    <DropdownMenuItem variant="destructive" onClick={handleDelete}>
      <Trash size={10} color="#dc2626" /> Hapus
    </DropdownMenuItem>
  );
};
