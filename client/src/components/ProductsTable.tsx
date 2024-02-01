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
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import ProductForm from "./ProductForm";

export type Product = {
  productName: string;
  productDetails: string;
  categoryName: string;
};

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "productName",
    header: "Product name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("productName")}</div>
    ),
  },
  {
    accessorKey: "productDetails",
    header: "Product details",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("productDetails")}</div>
    ),
  },
  {
    accessorKey: "categoryName",
    header: "Category",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("categoryName")}</div>
    ),
  },

  {
    accessorKey: "ProductsCategoryId",
  },
  {
    accessorKey: "id",
    header: "Actions",
    cell: ({ row }) => (
      <Popover>
        <PopoverTrigger asChild className="w-[100px]">
          <Button className="outline outline-gray-500 outline-[1px]">
            Update
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align={"end"}
          className="w-auto outline-gray-500 outline-[1px] ">
          <ProductForm values={row} />
        </PopoverContent>
      </Popover>
    ),
  },
];

const ProductTable = () => {
  const PRODUCT_URL = "/api/product";
  const axiosPrivate = useAxiosPrivate();
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
  const filter: string = columnFilters[0]?.value;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchData = (pageIndex: number, pageSize: number, filter: string) => {
    axiosPrivate
      .get(
        `${PRODUCT_URL}/data?pageIndex=${pageIndex}&pageSize=${pageSize}&filter=${
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
        <h1 className="text-2xl font-semibold">All Products</h1>
        <Input
          placeholder="Filter product..."
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

export default ProductTable;
