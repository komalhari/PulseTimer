"use client";

import React from "react";
import { DataTable } from "./dataTable";
import { getColumns } from "./columns";
import { SquarePen } from "lucide-react";
import { AddActivity } from "./addAcitivty";
import { UpdateActivity } from "./updateActivity";
import { RemoveActivity } from "./removeActivity";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import useInternalFormData from "@/stores/useInternalFormData";
import { useRouter } from "next/navigation";

const WorkoutManager = ({
  data,
  day,
  tableMode,
  onWorkoutsChange,
  onCustomWorkoutsChange,
}) => {
  const [workouts, setWorkouts] = useState(data);
  const [mode, setMode] = useState();
  const [row, setRow] = useState(undefined);
  const [formTrigger, setFormTrigger] = useState(0);
  const [rowSelection, setRowSelection] = useState({});
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const setInternalFormData = useInternalFormData(
    (state) => state.setInternalFormData
  );

  const router = useRouter();
  const handleAddWorkout = (newWorkout) => {
    setWorkouts((prev) => [...prev, newWorkout]);
    tableMode === "daily" && onWorkoutsChange((prev) => [...prev, newWorkout]);
    tableMode === "custom" &&
      onCustomWorkoutsChange((prev) => [...prev, newWorkout]);
  };

  const handleUpdate = (updatedWorkout) => {
    const updatedList = workouts.map((workout) =>
      workout.id === updatedWorkout.id ? updatedWorkout : workout
    );
    setWorkouts(updatedList);
    tableMode === "daily" && onWorkoutsChange(updatedList);
    tableMode === "custom" && onCustomWorkoutsChange(updatedList);
  };

  const handleRowClickForUpdate = (row) => {
    setFormTrigger((prev) => prev + 1);
    setRow(row);
  };

  const requiredKeys = Object.keys(rowSelection);

  const handleTrashClick = () => {
    const selectedIds = Object.keys(rowSelection);

    if (mode !== "delete") {
      setMode("delete");
    } else {
      if (selectedIds.length > 0) {
        setShowDeleteDialog(true);
      } else {
        // Exit delete mode if no selection
        setMode(undefined);
        setRowSelection({});
      }
    }
  };

  const handleDelete = () => {
    const idsToDelete = requiredKeys;

  const filtered = workouts.filter(
    (workout) => !idsToDelete.includes(workout.id)
  );

  setWorkouts(filtered);


    tableMode === "daily" && onWorkoutsChange(filtered);
    tableMode === "custom" && onCustomWorkoutsChange(filtered);
  };

  const columns = getColumns(mode, setInternalFormData, router, workouts);

  return (
    <div>
      <div className="flex w-full justify-end gap-2 mb-1">
        <AddActivity
          onSubmitted={handleAddWorkout}
          mode={mode}
          day={day}
          tableMode={tableMode}
        />
        <div
          className={`w-4 h-4 cursor-pointer transition-all duration-200 ${
            mode === "edit"
              ? "rounded-full p-1 bg-green-700 text-white"
              : " hover:text-green-700"
          }`}
        >
          <SquarePen
            className="w-4 h-4"
            onClick={() => setMode(mode === "edit" ? undefined : "edit")}
          />
        </div>

        <div
          className={`w-4 h-4 cursor-pointer transition-all duration-200 ${
            mode === "delete"
              ? "rounded-full p-1 bg-green-700 text-white"
              : " hover:text-green-700"
          }`}
        >
          <Trash2 onClick={handleTrashClick} className="w-4 h-4" />
        </div>
      </div>
      <UpdateActivity
        formData={row}
        formTrigger={formTrigger}
        onUpdated={handleUpdate}
        day={day}
        tableMode={tableMode}
        onClose={() => setMode(undefined)}
      />
      <RemoveActivity
        open={showDeleteDialog}
        checkedData={requiredKeys}
        onDeleted={handleDelete}
        tableMode={tableMode}
        onClose={() => {
          setMode(undefined);
          setShowDeleteDialog(false);
          setRowSelection({});
        }}
      />
      <DataTable
        columns={columns}
        data={workouts}
        mode={mode}
        onRowClickForUpdate={handleRowClickForUpdate}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
      />
    </div>
  );
};

export default WorkoutManager;
