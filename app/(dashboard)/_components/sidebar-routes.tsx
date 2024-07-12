"use client"

import { usePathname } from "next/navigation";
import { BarChart, Compass, Layout, List } from "lucide-react";
import { SidebarItem } from "./sidebar-item";

const guestRoutes = [
    {
      icon: Compass,
      label: "Browse",
      href: "/",
    },
    {
      icon: Layout,
      label: "Dashboard",
      href: "/dashboard",
    },
  ];
  
  const teacherRoutes = [
    {
      icon: List,
      label: "Courses",
      href: "/teacher/courses",
    },
    {
      icon: BarChart,
      label: "Analytics",
      href: "/teacher/analytics",
    },
  ]

export const SidebarRoutes = () => {
    const pathname = usePathname();
  
    const isTeacherPage = pathname?.includes("/teacher");
  
    const routes = isTeacherPage ? teacherRoutes : guestRoutes;
  
    return (
      <div className="flex flex-col w-full">
        {routes.map((route) => (
          <SidebarItem
            key={route.href}
            icon={route.icon}
            label={route.label}
            href={route.href}
          />
        ))}
      </div>
    )
  }