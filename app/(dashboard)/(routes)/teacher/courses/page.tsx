import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
// import { DataTable } from "./_components/data-table";
// import { columns } from "./_components/columns";
// import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
// import { db } from "@/lib/db";

const CoursesPage = async () => {

    // const userId = auth();

    // if (!userId) {
    //     return redirect("/");
    // }

    // Remove the getToken property from the userId object.
    // const { getToken, ...userIdWithoutToken } = userId;

    // const courses = await db.course.findMany({
    //     where: {
    //         // @ts-ignore
    //         userId: userIdWithoutToken.userId,
    //     },
    //     orderBy: {
    //         createdAt: "desc",
    //     },
    // });

    return (
        <div className="p-6">
            {/* <DataTable columns={columns} data={courses} /> */}
    
            <div>
                <Link href="/teacher/create">
                    <Button>
                        <PlusCircle className="h-4 w-4 mr-2" />
                        New course
                    </Button>
                </Link>
            </div>

           
        </div>
    );
};

export default CoursesPage;