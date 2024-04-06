"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from 'next/link'
import { Checkbox } from "@/components/ui/checkbox"
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

import { RxDoubleArrowRight, RxDoubleArrowLeft } from "react-icons/rx";


import { useState, useEffect, useCallback } from 'react';
import { AppService } from "@/service/app.service"
import { setAllCategories } from "@/redux/reducer"
import { useAppSelector } from "@/lib/hooks"
import { useDispatch } from "react-redux"
import showToast from "@/utils/toast"
import isAuth from "../isAuth"

const Interest = () => {
  const interests = useAppSelector((state) => state.app.categories)
  console.log(interests)
  const dispatch = useDispatch()
  const [pageLimit, setPageLimit] = useState(6);
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1);
  const fetchInterests = useCallback(
    async () => {
      const res = await AppService.category(JSON.stringify({ page: currentPage, limit: pageLimit }))
      if (!res.success) {
        showToast(res.message, "error")
      }
      else {
        setTotalPages(res?.pagination.totalPages)
        dispatch(setAllCategories(res?.categories))
      }

    },
    [pageLimit, currentPage, dispatch],
  )

  useEffect(() => {
    fetchInterests();
  }, [fetchInterests]);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div className="flex justify-center items-center h-[70vh]">
      <Card className="w-[400px]">
        <CardHeader className="flex justify-center items-center gap-2">
          <CardTitle className="font-bold text-2xl">Please mark your interests!</CardTitle>
          <CardDescription className=" text-black">We will keep you notified.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <h2 className="text-sm font-bold mb-2">My saved interest!</h2>
                {interests?.map((interest, idx) => (
                  <div key={idx}>
                    <Checkbox id={`interest-${idx}`} value={interest?.name} />
                    <Label
                      htmlFor={`interest-${idx}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 px-1 mx-2"
                    >
                      {interest?.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Pagination>
            <PaginationContent>
              <PaginationItem className="flex justify-center items-center">
                <RxDoubleArrowLeft disabled={currentPage === 1} onClick={() => handlePageChange(1)} />
                <MdKeyboardArrowLeft onClick={() => handlePageChange(currentPage == 1 ? 1 : currentPage - 1)} />
              </PaginationItem>
              {Array.from({ length: Math.ceil(totalPages / 6) }, (_, i) => i + 1)
                .slice(
                  Math.max(0, currentPage - 3),
                  Math.min(Math.ceil(totalPages / 6), currentPage + 4)
                )
                .map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      isActive={page === currentPage}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
              <PaginationItem className="flex justify-center items-center gap-1">
                <MdKeyboardArrowRight disabled={currentPage === Math.ceil(totalPages / 6)} onClick={() => handlePageChange(currentPage == Math.ceil(totalPages / 6) ? currentPage : currentPage + 1)} />
                <RxDoubleArrowRight disabled={currentPage === Math.ceil(totalPages / 6)} onClick={() => handlePageChange(Math.ceil(totalPages / 6))} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardFooter>
      </Card>
    </div>

  )
}

export default isAuth(Interest)