/* eslint-disable react-refresh/only-export-components */
"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import StoreForm from "./StoresForm";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import useInvoice from "@/hooks/useInvoice";
import RemoveItem from "./RemoveItem";

export type Invoice = {
  productName: string;
  quantity: number;
  discount: number;
};

export const columns: ColumnDef<Invoice>[] = [
  {
    accessorKey: "productName",
    header: "Product Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("productName")}</div>
    ),
  },

  {
    accessorKey: "quantity",
    header: "QTY",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("quantity")}</div>
    ),
  },
  {
    accessorKey: "discount",
    header: "Discount",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("discount")}</div>
    ),
  },
  {
    accessorKey: "subTotal",
    header: "Subtotal",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("subTotal")}</div>
    ),
  },
  {
    accessorKey: "StockId",
    header: "Action",
    cell: ({ row }) => (
      <>
        <Popover>
          <PopoverTrigger asChild className="w-[100px]">
            <Button className="outline bg-red-500 outline-gray-500 outline-[1px] text-xl w-[px]">
              X
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align={"end"}
            className="w-auto outline-gray-500 outline-[1px] ">
            <RemoveItem id={row.getValue("StockId")} />
          </PopoverContent>
        </Popover>
      </>
    ),
  },
];

const SalesInvoice = () => {
  const { invoiceItems } = useInvoice();
  const [data, setData] = useState({});

  useEffect(() => {
    console.log(invoiceItems);
    console.log();
    setData(invoiceItems);
  }, [invoiceItems]);

  const table = useReactTable({
    data,
    columns,

    getCoreRowModel: getCoreRowModel(),

    manualPagination: true,
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="rounded-sm border text-center">
      <ScrollArea className="h-[450px] w-[350px]">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody className="text-center">
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} width={"130px"} height={"20px"}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
};

export default SalesInvoice;
