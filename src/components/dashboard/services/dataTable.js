"use client";
import React, { useState } from "react";
import { Play } from "lucide-react";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  enableRowSelection,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function DataTable({
  columns,
  data,
  mode,
  onRowClickForUpdate,
  rowSelection,
  setRowSelection,
}) {
  const [sorting, setSorting] = useState([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getRowId: (row) => row.id,
    state: {
      sorting,
      rowSelection,
    },
    enableRowSelection: mode === "delete",
    onRowSelectionChange: setRowSelection,
  });

  return (
    <div className="rounded-md border select-none">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead className="text-center" key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => {
              return (
                <TableRow
                  key={row.original.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={
                    mode ? "cursor-pointer hover:bg-muted transition" : ""
                  }
                  onClick={() => {
                    if (
                      mode === "edit" &&
                      typeof onRowClickForUpdate === "function"
                    ) {
                      onRowClickForUpdate(row.original);
                    }
                    if (mode === "delete") {
                      row.toggleSelected(!row.getIsSelected());
                    }
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="text-center" key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-15 text-center">
                No Workouts to Show!
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
