
import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { createClient } from "@/utils/supabase/server";

export async function PUT(req, { params }) {
  const { id } = params; // dynamic [id] from URL
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json();
  const { activity, sets, reps, rest, duration, day } = data;

  try {
    const updated = await prisma.dailyWorkout.update({
      where: {
        id, // the workout ID in URL
        userId: user.id, // makes sure user can only update *their* workout
      },
      data: {
        activity,
        sets: Number(sets),
        reps: Number(reps),
        rest: Number(rest),
        duration: Number(duration),
        day : String(day),
      },
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error("Update workout error:", err);
    return NextResponse.json({ error: "Workout not found or update failed" }, { status: 500 });
  }
}

// export async function DELETE(req, { params }) {
//   const { id } = params;
//   const supabase = await createClient();

//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   if (!user) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   try {
//     const deleted = await prisma.dailyWorkout.delete({
//       where: {
//         id,
//         userId: user.id,
//       },
//     });

//     return NextResponse.json({ success: true, deleted });
//   } catch (err) {
//     console.error("Delete workout error:", err);
//     return NextResponse.json({ error: "Workout not found or delete failed" }, { status: 500 });
//   }
// }