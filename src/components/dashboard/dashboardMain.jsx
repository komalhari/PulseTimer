"use client";
import { AppSidebar } from "@/components/dashboard/sidebar_ui/app-sidebar"
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { useState, useEffect } from "react";
import WorkoutTabs from "@/components/dashboard/workoutManagement/workoutManagement";
import HomeSection from "@/components/dashboard/home/home";
import InstantWorkout from "@/components/dashboard/instantWorkout/instantWorkout";
import CustomWorkout from "@/components/dashboard/customWorkout/customWorkout";

export default function DashboardMain({
  user,
  profile,
  providers,
  userId,
  data,
  customWorkouts,
}) {
  const [navigation, setNavigation] = useState("Home");

 const [workoutData, setWorkoutData] = useState(data);

 
 const [customWorkoutData, setCustomWorkoutData] = useState(customWorkouts);

  return (
   
    <SidebarProvider className="flex h-screen overflow-hidden">
      <AppSidebar
        setNavigation={setNavigation}
        user={user}
        profile={profile}
        providers={providers}
        userId={userId}
      />
      <SidebarInset className="flex flex-col flex-1 overflow-hidden">
        <header className="bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>{navigation}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 max-w-screen">
          <div className="flex-1">
            {navigation === "Home" && <HomeSection data={workoutData} setWorkoutData={setWorkoutData} />}
            {navigation === "Workout Manager" && <WorkoutTabs data={workoutData} setWorkoutData={setWorkoutData}  />}
            {navigation === "Instant Workout" && <InstantWorkout />}
            {navigation === "Custom Workout" && <CustomWorkout customWorkouts={customWorkoutData} setCustomWorkoutData={setCustomWorkoutData} />}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
 
  );
}
