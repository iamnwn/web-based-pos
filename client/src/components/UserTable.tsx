/* eslint-disable react-refresh/only-export-components */
"use client";
import UserForm from "../components/UserForm";

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
import UserServices from "@/services/UserService";

export type User = {
  id: number;
  nic: number;
  emergencyContact: string;
  state: string;
  district: string;
  postalCode: string;
  userRole: string;
  userName: string;

  isActive: string;

  StoreId: number;

  firstName: string;
  lastName: string;
  contact: number;
  email: string;
  city: string;
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "firstName",
    header: "First name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("firstName")}</div>
    ),
  },
  {
    accessorKey: "lastName",
    header: "Last name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("lastName")}</div>
    ),
  },
  {
    accessorKey: "nic",
    header: "NIC no.",
    cell: ({ row }) => <div className="capitalize">{row.getValue("nic")}</div>,
  },
  {
    accessorKey: "contact",
    header: "Contact",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("contact")}</div>
    ),
  },
  {
    accessorKey: "emergencyContact",
    header: "Emergency",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("emergencyContact")}</div>
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
    accessorKey: "state",
    header: "State",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("state")}</div>
    ),
  },
  {
    accessorKey: "district",
    header: "District",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("district")}</div>
    ),
  },
  {
    accessorKey: "city",
    header: "City",
    cell: ({ row }) => <div className="capitalize">{row.getValue("city")}</div>,
  },
  {
    accessorKey: "postalCode",
    header: "Postal Code",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("postalCode")}</div>
    ),
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
    accessorKey: "userRole",
    header: "User Role",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("userRole")}</div>
    ),
  },
  {
    accessorKey: "storeName",
    header: "Store Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("storeName")}</div>
    ),
  },
  {
    accessorKey: "isActive",
    header: "Is Active",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("isActive") ? "Yes" : "No"}
      </div>
    ),
  },
  {
    accessorKey: "userName",
    header: "User Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("userName")}</div>
    ),
  },
  {
    accessorKey: "StoreId",
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
          <UserForm values={row} />
        </PopoverContent>
      </Popover>
    ),
  },
];

const UserTable = () => {
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
    UserServices.getUsersData(pageIndex, pageSize, filter)
      .then((data) => {
        console.log(data);

        setData(data.data);

        setPageCount(data.meta.totalPages);
      })
      .catch((err) => {});
  };

  React.useEffect(() => {
    fetchData(pageIndex, pageSize, filter);
  }, [pageIndex, pageSize, filter]);

  return (
    <div className="w-full">
      <div className="grid gap-5 items-center py-4">
        <h1 className="text-2xl font-semibold">All users</h1>
        <Input
          typeof="number"
          placeholder="Filter NIC..."
          value={(table.getColumn("nic")?.getFilterValue() as string) ?? ""}
          onChange={(event) => {
            table.getColumn("nic")?.setFilterValue(event.target.value);
            setPageIndex(0);
          }}
          type="number"
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

export default UserTable;
