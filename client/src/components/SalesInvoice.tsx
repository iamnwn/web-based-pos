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
import { useState } from "react";

export type User = {
  storeName: string;
  storeLocation: string;
  firstName: string;
};

export const columns: ColumnDef<User>[] = [
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
    cell: ({ row }) => <div className="capitalize">{row.getValue("qty")}</div>,
  },
  {
    accessorKey: "discount",
    header: "Discount",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("discount")}</div>
    ),
  },

  {
    accessorKey: "StockId",
    header: "Actions",
    cell: ({ row }) => (
      <Popover>
        <PopoverTrigger asChild className="w-[100px]">
          <Button className="outline outline-gray-500 outline-[1px]">
            Add
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align={"end"}
          className="w-auto outline-gray-500 outline-[1px] ">
          <StoreForm values={row} />
        </PopoverContent>
      </Popover>
    ),
  },
];

const SalesInvoice = () => {
  const [data, setData] = useState({});

  const table = useReactTable({
    data,
    columns,

    getCoreRowModel: getCoreRowModel(),

    manualPagination: true,
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="w-[350px] ">
      <div className="grid gap-5 items-center py-4"></div>
      <div className="rounded-sm border w-auto">
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

          <ScrollArea className="h-[400px]">
            <TableBody>
              {table.getRowModel().rows?.length
                ? table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          width={"130px"}
                          height={"20px"}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </ScrollArea>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground"></div>
      </div>
    </div>
  );
};

export default SalesInvoice;
