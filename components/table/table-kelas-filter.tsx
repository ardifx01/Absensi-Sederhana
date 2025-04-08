"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Kelas } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

const TableKelasFilter = ({
  dataKelas,
  nama_kelas,
}: {
  dataKelas: Kelas[];
  nama_kelas: string | undefined;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [selectedValue, setSelectedValue] = useState<string>(nama_kelas || "");

  const params = new URLSearchParams(searchParams);

  const handleValueChange = (value: string) => {
    setSelectedValue(value);
    value ? params.set("nama_kelas", value) : params.delete("nama_kelas");
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleReset = () => {
    setSelectedValue("");
    params.delete("nama_kelas");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center space-x-1.5">
      <Select value={selectedValue} onValueChange={handleValueChange}>
        <SelectTrigger className="w-[130px]">
          <SelectValue placeholder="Filter Kelas" />
        </SelectTrigger>
        <SelectContent>
          {dataKelas.map((item) => (
            <span key={item.id_kelas}>
              <SelectItem value={item.nama_kelas}>{item.nama_kelas}</SelectItem>
            </span>
          ))}
        </SelectContent>
      </Select>

      {nama_kelas && (
        <Button
          className="rounded-full"
          variant="outline"
          size="reset"
          onClick={handleReset}
        >
          <PlusIcon size={16} className="rotate-45" />
        </Button>
      )}
    </div>
  );
};

export default TableKelasFilter;
