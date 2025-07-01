// /app/api/workouts/route.js
import { NextResponse } from "next/server";
import  prisma  from "@/utils/prisma"; // adjust path if different
import { createClient } from "@/utils/supabase/server";

export async function POST(req) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    console.log(body)
    const { activity, sets, reps, rest, duration, day } = body;

    const newWorkout = await prisma.dailyWorkout.create({
      data: {
        userId: user.id,
        activity: activity,
        sets: Number(sets),
        reps: Number(reps),
        duration: Number(duration),
        rest: Number(rest),
        day: String(day),
      },
    });

    return NextResponse.json(newWorkout);
  } catch (err) {
    console.error("Workout API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { ids } = body; // expecting { ids: [uuid1, uuid2, ...] }

  if (!Array.isArray(ids) || ids.length === 0) {
    return NextResponse.json({ error: "No IDs provided" }, { status: 400 });
  }

  try {
    const deleted = await prisma.dailyWorkout.deleteMany({
      where: {
        id: { in: ids },
        userId: user.id,
      },
    });

    return NextResponse.json({ success: true, count: deleted.count });
  } catch (err) {
    console.error("Bulk delete error:", err);
    return NextResponse.json({ error: "Bulk delete failed" }, { status: 500 });
  }
}
