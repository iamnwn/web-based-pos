/* eslint-disable react-refresh/only-export-components */
"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import StoreForm from "./StoresForm";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
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
    accessorKey: "batch",
    header: "Batch No",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("batch")}</div>
    ),
  },
  {
    accessorKey: "barcode",
    header: "Barcode",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("barcode")}</div>
    ),
  },
  {
    accessorKey: "quantityInStock",
    header: "QTY",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("quantityInStock")}</div>
    ),
  },
  {
    accessorKey: "unitPrice",
    header: "Unit Price",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("unitPrice")}</div>
    ),
  },
  {
    accessorKey: "maxDiscount",
    header: "MAX %",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("maxDiscount")}</div>
    ),
  },
  {
    accessorKey: "defaultDiscount",
    header: "Default %",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("defaultDiscount")}</div>
    ),
  },
  {
    accessorKey: "available",
    header: "Availability",
    cell: ({ row }) => (
      <div className="available">
        {" "}
        {row.getValue("available") ? "Yes" : "No"}
      </div>
    ),
  },

  {
    accessorKey: "id",
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

const SalesTable = () => {
  const axiosPrivate = useAxiosPrivate();
  const STOCK_URL = "/api/stock";
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [pageIndex, setPageIndex] = React.useState(0);
  const [pageCount, setPageCount] = React.useState(0);
  const [data, setData] = React.useState([]);

  const table = useReactTable({
    data,
    columns,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),

    manualPagination: true,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  const pageSize: number = 8;
  const filter: string = "";

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchData = async (
    pageIndex: number,
    pageSize: number,
    filter: string
  ) => {
    await axiosPrivate
      .get(
        `${STOCK_URL}/data?pageIndex=${pageIndex}&pageSize=${pageSize}&filter=${
          !filter ? "" : filter
        }`
      )
      .then((data) => {
        console.log(data);

        setData(data.data.data);

        setPageCount(data.data.meta.totalPages);
      })
      .catch((err) => {});
  };

  React.useEffect(() => {
    fetchData(pageIndex, pageSize, filter);
  }, [pageIndex, pageSize, filter]);

  return (
    <div className="w-full">
      <div className="grid gap-5 items-center py-4">
        <Input
          placeholder="Filter Product..."
          value={
            (table.getColumn("productName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) => {
            table.getColumn("productName")?.setFilterValue(event.target.value);
            setPageIndex(0);
          }}
          className="w-[250px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
      </div>
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
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} width={"130px"} height={"20px"}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center">
                  No users
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground"></div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPageIndex(pageIndex - 1)}
            disabled={pageIndex === 0}>
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPageIndex(pageIndex + 1)}
            disabled={pageIndex + 1 === pageCount}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SalesTable;
