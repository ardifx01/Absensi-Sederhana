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
import { CheckIcon, LoaderCircleIcon, X } from "lucide-react";


import { useSiswaTable } from "@/hooks/useSiswa";
import TableSkeletonv2 from "@/components/table/table-skeleton-v2";
import { Badge } from "@/components/ui/badge";

const AbsensiTable = ({
  query,
  currentPage,
  nama_kelas,
}: {
  query: string;
  currentPage: number;
  nama_kelas: undefined;
}) => {
  const { siswas, isLoading, isFetching, error } = useSiswaTable(
    query,
    currentPage,
    nama_kelas
  );

  return (
    <div className="flex rounded-md border">
      <ScrollArea type="always" className="w-1 flex-1">
        <div className="flex gap-2 pb-4 whitespace-nowrap">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Kelas</TableHead>
                <TableHead>Status</TableHead>
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
                      <TableCell>{item.kelas.nama_kelas}</TableCell>
                      <TableCell>
                        {item.kehadiran?.kehadiran === "hadir" ||
                        item.kehadiran?.kehadiran === "terlambat" ? (
                          <Badge variant="outline" className="gap-1">
                            <CheckIcon
                              className="text-emerald-500"
                              size={12}
                              aria-hidden="true"
                            />
                            Hadir
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="gap-1">
                            <X
                              className="text-[#ef4444]"
                              size={12}
                              aria-hidden="true"
                            />
                            Tidak hadir
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {item.kehadiran?.kehadiran}
                        </Badge>
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
