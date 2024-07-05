"use client"

import { usePathname, useSearchParams } from "next/navigation"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination"

export type ListPaginationProps = {
  currentPage: number
  totalPages: number
}

export const ListPagination: React.FC<ListPaginationProps> = ({
  currentPage,
  totalPages,
}) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const pageNumbers = []

  // Determine the range of page numbers to display
  const startPage = Math.max(2, currentPage - 2)
  const endPage = Math.min(totalPages - 1, currentPage + 2)

  // Always include the first page
  if (startPage > 2) {
    pageNumbers.push(1, "ellipsis1")
  } else if (startPage === 2) {
    pageNumbers.push(1)
  }

  // Include the dynamic range of page numbers
  for (let pageNum = startPage; pageNum <= endPage; pageNum++) {
    pageNumbers.push(pageNum)
  }

  // Always include the last page
  if (endPage < totalPages - 1) {
    pageNumbers.push("ellipsis2", totalPages)
  } else if (endPage === totalPages - 1) {
    pageNumbers.push(totalPages)
  }

  function setPage(pageNum: number) {
    const search = new URLSearchParams(searchParams)
    search.set("page", pageNum.toString())
    return `${pathname}?${search.toString()}`
  }

  const pageLink = (pageNum: number) => setPage(pageNum)

  const prevLink = setPage(currentPage - 1)
  const nextLink = setPage(currentPage + 1)

  return (
    <Pagination>
      <PaginationContent>
        {currentPage !== 1 && (
          <PaginationItem>
            <PaginationPrevious href={prevLink} />
          </PaginationItem>
        )}

        {pageNumbers.map((pageNum) =>
          pageNum === "ellipsis1" || pageNum === "ellipsis2" ? (
            <PaginationEllipsis key={pageNum} />
          ) : (
            <PaginationItem key={pageNum}>
              <PaginationLink
                isActive={pageNum === currentPage}
                href={pageLink(Number(pageNum))}
              >
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        {currentPage !== totalPages && (
          <PaginationItem>
            <PaginationNext href={nextLink} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  )
}
