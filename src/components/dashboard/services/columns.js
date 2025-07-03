"use client";

import { ArrowUpDown, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

export const getColumns = (mode, setInternalFormdata, router, workouts) => [
  {
    accessorKey: "player_or_checkbox",
    header: ({ table }) => {
      return mode === "delete" ? (
        <input
          type="checkbox"
          checked={table.getIsAllPageRowsSelected()}
          onChange={table.getToggleAllPageRowsSelectedHandler()}
        />
      ) : (
        <div className="grid place-items-center">
          <Play className="h-5 w-5 fill-black" />
        </div>
      );
    },

    cell: ({ row }) =>
      mode === "delete" ? (
        <Button variant="ghost" size="sm">
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
        </Button>
      ) : (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setInternalFormdata(row.original, workouts);

            window.location.href = "/timer";
          }}
        >
          <Play className="h-3 w-3" />
        </Button>
      ),
  },

  {
    accessorKey: "activity",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Acitivty Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: "sets",
    header: "Total Sets",
  },
  {
    accessorKey: "duration",
    header: "Duration / Set",
  },
  {
    accessorKey: "rest",
    header: "Rest / Set",
  },
  {
    accessorKey: "reps",
    header: "Reps / Set",
  },
];
