// import auth session from Kinde
import { redirect } from "next/navigation";
import { CheckCircle, Clock, InfoIcon } from "lucide-react";
import { InfoCard } from "./_components/info-card";
import { BannerCard } from "./_components/banner-card";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { CoursesList } from "@/components/course-list";
import { getDashboardCourses } from "@/actions/get-dashboard-corses";

export default async function Dashboard() {

  const { getUser } = getKindeServerSession();
  const user = await getUser()

  if (!user) {
    return redirect("/search");
  }

  const {
    completedCourses,
    coursesInProgress
  } = await getDashboardCourses(user.id);

  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <BannerCard
            icon={InfoIcon}
            label="Welcome to the dashboard"
            description={`This is where you can see your progress 
            and continue your courses. This is a demonstration LMS and as such, all courses are free and Stripe is in test
             mode. To enroll in a course, enter dummy data in the Stripe form. Contact me from
             folio.kendev.co to obtain admin access`}
        />
      </div>
      {
        user && (
          <>
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InfoCard
              icon={Clock}
              label="In Progress"
              numberOfItems={2}
            />
            <InfoCard
              icon={CheckCircle}
              label="Completed"
              numberOfItems={4}
              variant="success"
            />
          </div>
          <CoursesList
            items={[...coursesInProgress, ...completedCourses]}
          />
          </>
        )
      }
     
    </div>
  )
}