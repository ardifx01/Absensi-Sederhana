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
const TableSkeleton = () => {
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
          <TableCell className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none">
                <MoreHorizontal />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>d</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>d</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default TableSkeleton;
