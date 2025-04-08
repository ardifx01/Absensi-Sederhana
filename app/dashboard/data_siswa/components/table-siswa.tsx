"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { LoaderCircleIcon, MoreHorizontal, Pencil } from "lucide-react";

import TableSkeleton from "../../../../components/table/table-skeleton";
import { useSiswaTable } from "@/hooks/useSiswa";
import { DeleteButton, EditButton } from "./table-action-button";

const SiswaTable = ({
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
                <TableHead>Jenis Kelamin</TableHead>
                <TableHead>Kelas</TableHead>
                <TableHead className="relative flex items-center">
                  <span>Aksi</span>
                  {/* <LoaderCircleIcon
                    className="-ms-1 animate-spin absolute right-4"
                    size={14}
                    aria-hidden="true"
                  /> */}
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
                <TableSkeleton />
              ) : error ? (
                <p>error data</p>
              ) : (
                siswas?.map((item) => (
                  <TableRow key={item.id_siswa}>
                    <TableCell>{item.nis}</TableCell>
                    <TableCell>{item.nama}</TableCell>
                    <TableCell>{item.gender}</TableCell>
                    <TableCell>{item.kelas.nama_kelas}</TableCell>
                    <TableCell className="flex items-center space-x-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger className="focus:outline-none">
                          <MoreHorizontal />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <EditButton id_siswa={item.id_siswa} />
                          <DropdownMenuSeparator />
                          <DeleteButton id_siswa={item.id_siswa} />
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        <ScrollBar orientation="horizontal" className="w-full" />
      </ScrollArea>
    </div>
  );
};

export default SiswaTable;
