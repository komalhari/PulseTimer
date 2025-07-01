import * as React from "react";
import { Home, Settings2, Zap, Dumbbell } from "lucide-react";

import { DatePicker } from "@/components/dashboard/sidebar_ui/date-picker";
import { NavUser } from "./nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";

import { NavMain } from "./nav-main";

const data = {
  navMain: [
    {
      title: "Home",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Workout Manager",
      icon: Settings2,
    },
    {
      title: "Instant Workout",
      icon: Zap,
    },
    {
      title: "Custom Workout",
      icon: Dumbbell,
    },
  ],
};

export function AppSidebar({
  setNavigation,
  user,
  profile,
  providers,
  userId,
}) {
  return (
    <Sidebar>
      <SidebarHeader className="border-sidebar-border h-16 border-b">
        <NavUser
          user={user}
          profile={profile}
          providers={providers}
          userId={userId}
        />
      </SidebarHeader>
      <SidebarContent>
        <DatePicker />

        <SidebarSeparator className="mx-0" />
        <NavMain items={data.navMain} setNavigation={setNavigation} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
