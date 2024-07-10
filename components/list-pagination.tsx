"use client"

import { usePagination } from "@/hooks"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface ListPaginationProps {
  currentPage: number
  totalPages: number
}

export const ListPagination: React.FC<ListPaginationProps> = ({
  currentPage,
  totalPages,
}) => {
  const { numbers, prevLink, nextLink, pageLink } = usePagination({
    currentPage,
    totalPages: totalPages > 500 ? 500 : totalPages,
  })

  return (
    <Pagination>
      <PaginationContent>
        {currentPage !== 1 && (
          <PaginationItem>
            <PaginationPrevious className="hidden md:flex" href={prevLink} />
          </PaginationItem>
        )}

        {totalPages > 1 &&
          numbers.map((number) =>
            number === "ellipsis1" || number === "ellipsis2" ? (
              <PaginationEllipsis className="hidden md:flex" key={number} />
            ) : (
              <PaginationItem key={number}>
                <PaginationLink
                  isActive={number === currentPage}
                  href={pageLink(number)}
                >
                  {number}
                </PaginationLink>
              </PaginationItem>
            )
          )}

        {currentPage !== totalPages && (
          <PaginationItem>
            <PaginationNext className="hidden md:flex" href={nextLink} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  )
}
