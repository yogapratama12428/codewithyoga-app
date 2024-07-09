import { isTeacher } from "@/lib/teacher";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";


const TeacherLayout = async ({children} : {
    children: React.ReactNode
}) => {

    const { getUser } = getKindeServerSession();

    const user = await getUser();

    if(!isTeacher(user?.id)) return redirect("/")

    return (
        <>
            {children}
        </>
    )
}

export default TeacherLayout;