/* eslint-disable react-refresh/only-export-components */
"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
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
import customerServices from "@/services/customerServices";

export type Customer = {
  id: number;
  firstName: string;
  lastName: string;
  contact: number;
  email: string;
  city: string;
  createdAt: string;
};

export const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: "s.no",
    header: "S. No",
    cell: ({ row }) => <div className="capitalize">{parseInt(row.id) + 1}</div>,
  },

  {
    accessorKey: "lastName",
    header: "Last name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("lastName")}</div>
    ),
  },
  {
    accessorKey: "contact",
    header: "Contact",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("contact")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("email")}</div>
    ),
  },
  {
    accessorKey: "city",
    header: "City",
    cell: ({ row }) => <div className="capitalize">{row.getValue("city")}</div>,
  },
  {
    accessorKey: "createdAt",
    header: "Reg. Date",
    cell: ({ row }) => (
      <div className="capitalize">
        {new Date(row.getValue("createdAt")).toLocaleDateString()}
      </div>
    ),
  },
  {
    accessorKey: "id",
    header: "Actions",
    cell: ({ row }) => (
      <Button onClick={() => handleActionClick(parseInt(row.getValue("id")))}>
        Update
      </Button>
    ),
  },
];
const handleActionClick = (id: number) => {
  console.log(typeof id);
};

const CustomerTable = () => {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 8,
  });
  const [data, setData] = React.useState([]);

  const table = useReactTable({
    data,
    columns,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: setPagination,
    manualPagination: true,
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
      pagination,
    },
  });

  const pageSize = 8;
  const pageIndex = table.getState().pagination.pageIndex;
  const filter = columnFilters[0]?.value;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchData = (pageIndex: number, pageSize: number, filter: string) => {
    customerServices
      .getCustomersData(pageIndex, pageSize, filter)
      .then((data) => {
        console.log(data);

        setData(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    fetchData(pageIndex, pageSize, filter);
    setPagination;
  }, [pageIndex, pageSize, filter, fetchData]);

  console.log(columnFilters);

  return (
    <div className="w-full">
      <div className="grid gap-5 items-center py-4">
        <h1 className="text-2xl font-semibold">All customers</h1>
        <Input
          placeholder="Filter Contacts..."
          value={(table.getColumn("contact")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("contact")?.setFilterValue(event.target.value)
          }
          type="number"
          className="w-[250px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
      </div>
      <div className="rounded-sm border w-[900px]">
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
                    <TableCell key={cell.id}>
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
                  No customers
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
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}>
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomerTable;
