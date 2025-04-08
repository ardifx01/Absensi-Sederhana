"use client";

import {
  TableCell,
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

import { MoreHorizontal } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
const TableSkeletonv2 = () => {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <TableRow key={index}>
          <TableCell>
            <Skeleton className="w-[60px] h-[20px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-[130px] h-[20px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-[110px] h-[20px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-[130px] h-[20px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-[130px] h-[20px]" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default TableSkeletonv2;
