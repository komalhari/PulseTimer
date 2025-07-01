"use client";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  
} from "@/components/ui/alert-dialog";

export function RemoveActivity({ open, checkedData, onDeleted, onClose, tableMode }) {
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const endpoint = tableMode === "daily" ? "/api/daily_workouts" : "/api/workouts"
    try {
      const res = await fetch(endpoint, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: checkedData }),
      });

      const result = await res.json();

      if (res.ok) {
        onDeleted(result);
        onClose?.();
      } else {
        alert("Failed to delete: " + result.error);
      }
    } catch (err) {
      console.error("Delete error:", err);
    } finally{
      setLoading(false)
    }
  };

  return (
    <AlertDialog
      open={open}
      onOpenChange={(isOpen) => {
         setLoading(false);

        !isOpen && onClose?.();
      }}
    >
      
        <AlertDialogContent>
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            </AlertDialogHeader>

            <AlertDialogFooter>
             <AlertDialogCancel>Cancel</AlertDialogCancel>
        

              <Button type="submit">
                Delete{" "}
                {loading && <Loader2 className="ml h-4 w-4 animate-spin" />}
              </Button>

            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
    
    </AlertDialog>
  );
}
