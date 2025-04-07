"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { generatePagination } from "@/lib/utils";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const TablePagination = ({ totalPages }: { totalPages: number }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: string | number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const allPages = generatePagination(currentPage, totalPages);

  const renderPages = () => {
    const renderedPages = allPages.map((page, index) => (
      <PaginationItem key={index}>
        <PaginationLink
          href={createPageURL(page)}
          isActive={currentPage == page}
        >
          {page}
        </PaginationLink>
      </PaginationItem>
    ));
    return renderedPages;
  };

  return (
    <div className="mt-6">
      <Pagination>
        <PaginationContent className="flex flex-col space-y-2">
          <div className="w-full flex items-center justify-center">
            {renderPages()}
          </div>
          <div className="flex">
            <PaginationItem>
              {currentPage <= 1 ? (
                <PaginationPrevious aria-disabled />
              ) : (
                <PaginationPrevious
                  isActive
                  href={createPageURL(currentPage - 1)}
                />
              )}
            </PaginationItem>
            <PaginationItem>
              {currentPage >= totalPages ? (
                <PaginationNext aria-disabled />
              ) : (
                <PaginationNext
                  isActive
                  href={createPageURL(currentPage + 1)}
                />
              )}
            </PaginationItem>
          </div>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default TablePagination;
