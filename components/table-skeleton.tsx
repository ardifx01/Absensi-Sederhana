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
import { MoreHorizontal } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
const TableSkeleton = () => {
  return (
    <div className="flex rounded-md border">
      <ScrollArea type="always" className="w-1 flex-1">
        <div className="flex gap-2 pb-4 whitespace-nowrap">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Skeleton className="w-[45px] h-[20px]" />
                </TableHead>
                <TableHead>
                  <Skeleton className="w-[80px] h-[20px]" />
                </TableHead>
                <TableHead>
                  <Skeleton className="w-[70px] h-[20px]" />
                </TableHead>
                <TableHead>
                  <Skeleton className="w-[95px] h-[20px]" />
                </TableHead>
                <TableHead>
                  <Skeleton className="w-[80px] h-[20px]" />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
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
            </TableBody>
          </Table>
        </div>
        <ScrollBar orientation="horizontal" className="w-full" />
      </ScrollArea>
    </div>
  );
};

export default TableSkeleton;
