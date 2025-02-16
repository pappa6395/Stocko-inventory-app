"use client";
 
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams } from "next/navigation";
 
export default function Paginate({ totalPages }: {totalPages: number;}) {
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort") || "asc";
  const min = searchParams.get("min") || "";
  const max = searchParams.get("max") || "";
  const type = searchParams.get("type") || "main";
  const currentPage = searchParams.get("page") || "";
 
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={`?${
              currentPage === "1"
                ? new URLSearchParams({ type, page: "1", sort, min, max })
                : new URLSearchParams({
                    type,
                    page: (+currentPage - 1).toString(),
                    sort,
                    min,
                    max,
                  })
            }`}
          />
        </PaginationItem>
        {totalPages <= 5 ? (
          Array.from({ length: totalPages }, (_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                isActive={index + 1 === +currentPage}
                href={`?${new URLSearchParams({
                  type,
                  page: (index + 1).toString(),
                  sort,
                  min,
                  max,
                })}`}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))
        ) : (
          <>
            {Array.from({ length: 5 }, (_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href={`?${new URLSearchParams({
                    type,
                    page: (index + 1).toString(),
                    sort,
                    min,
                    max,
                  })}`}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          </>
        )}
        <PaginationItem>
          <PaginationNext
            href={`?${
              +currentPage == totalPages
                ? new URLSearchParams({
                    type,
                    page: totalPages.toString(),
                    sort,
                    min,
                    max,
                  })
                : new URLSearchParams({
                    type,
                    page: (currentPage + 1).toString(),
                    sort,
                    min,
                    max,
                  })
            }`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}