import { redirect } from "next/navigation";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { db } from "@/app/lib/db";
// import { db } from "@/lib/db";

const CoursesPage = async () => {

    const { getUser } = getKindeServerSession();

    const user = await getUser();

    if (!user) {
        return redirect("/");
    }

    const courses = await db.course.findMany({
        where: {
            userId: user.id
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return (
        <div className="p-6">
            <DataTable columns={columns} data={courses} />
        </div>
    );
};

export default CoursesPage;