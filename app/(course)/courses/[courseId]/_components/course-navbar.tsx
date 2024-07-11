import { Chapter, Course, UserProgress } from "@prisma/client"

import { CourseMobileSidebar } from "./course-mobile-sidebar";
import { NavbarRoutes } from "@/components/navbar-routes";
import { Logo } from "@/app/(dashboard)/_components/logo";



interface CourseNavbarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
  user: any
};

export const CourseNavbar = ({
  course,
  progressCount,
  user
}: CourseNavbarProps) => {
  return (
    <div className="p-4 border-b h-full flex justify-between items-center bg-white shadow-sm">
      <div className="hidden md:block">
        <Logo />
      </div>
      <CourseMobileSidebar
        course={course}
        progressCount={progressCount}
      />
      <NavbarRoutes user={user}/>      
    </div>
  )
}