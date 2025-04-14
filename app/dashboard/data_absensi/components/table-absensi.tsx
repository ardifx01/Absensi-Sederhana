"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { LoaderCircleIcon } from "lucide-react";


import { useSiswaForAbsen } from "@/hooks/useSiswa";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useKehadirans } from "@/hooks/useKehadiran";
import TableSkeletonv2 from "@/components/table/table-skeleton-v2";
import { useState } from "react";

const AbsensiTable = ({
  query,
  currentPage,
  nama_kelas,
}: {
  query: string;
  currentPage: number;
  nama_kelas: undefined;
}) => {
  const { siswas, isLoading, isFetching, error } = useSiswaForAbsen(
    query,
    currentPage,
    nama_kelas
  );

  const [localKehadiran, setLocalKehadiran] = useState<{
    [key: number]:
      | "hadir"
      | "terlambat"
      | "sakit"
      | "izin"
      | "alpha"
      | undefined;
  }>({});

  const { updateAbsensi } = useKehadirans();

  async function handleUpdate(
    id_siswas: number,
    value: "hadir" | "terlambat" | "sakit" | "izin" | "alpha"
  ) {
    setLocalKehadiran((prev) => ({
      ...prev,
      [id_siswas]: value,
    }));

    updateAbsensi({ id_siswa: id_siswas, kehadiranValue: value });
  }

  return (
    <div className="flex rounded-md border">
      <ScrollArea type="always" className="w-1 flex-1">
        <div className="flex gap-2 pb-4 whitespace-nowrap">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Jenis Kelamin</TableHead>
                <TableHead>Kelas</TableHead>
                <TableHead className="flex items-center relative">
                  <span>Kehadiran</span>
                  {isFetching && (
                    <LoaderCircleIcon
                      className="-ms-1 animate-spin absolute right-4"
                      size={14}
                      aria-hidden="true"
                    />
                  )}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableSkeletonv2 />
              ) : error ? (
                <p>error data</p>
              ) : (
                <>
                  {siswas?.map((item) => (
                    <TableRow key={item.id_siswa}>
                      <TableCell>{item.nis}</TableCell>
                      <TableCell>{item.nama}</TableCell>
                      <TableCell>{item.gender}</TableCell>
                      <TableCell>{item.kelas.nama_kelas}</TableCell>
                      <TableCell className="w-[100px]">
                        <RadioGroup
                          value={
                            localKehadiran[item.id_siswa] ||
                            item.kehadiran?.kehadiran
                          }
                          onValueChange={(value) =>
                            handleUpdate(
                              item.id_siswa,
                              value as
                                | "hadir"
                                | "terlambat"
                                | "sakit"
                                | "izin"
                                | "alpha"
                            )
                          }
                        >
                          <div className="flex gap-4 p-3 outline-none">
                            {[
                              "hadir",
                              "terlambat",
                              "sakit",
                              "izin",
                              "alpha",
                            ].map((status) => (
                              <div
                                key={status}
                                className="flex items-center space-x-2 relative"
                              >
                                <RadioGroupItem
                                  value={status}
                                  id={`${status}-${item.id_siswa}`}
                                />
                                <Label htmlFor={`${status}-${item.id_siswa}`}>
                                  {status.charAt(0).toUpperCase() +
                                    status.slice(1)}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </RadioGroup>
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              )}
            </TableBody>
          </Table>
        </div>
        <ScrollBar orientation="horizontal" className="w-full" />
      </ScrollArea>
    </div>
  );
};

export default AbsensiTable;
