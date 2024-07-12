import { db } from "@/app/lib/db"

type getCourseDetails = {
    title: string
}

export const getCourseDetails = async ({
    title
}: getCourseDetails) => {
    try {
        const course = await db.course.findFirst({
            where: {
                title: title
            },
        })

        return course
        
    } catch (error) {
        console.log("[GET_COURSES_DETAILS]", error);
    }
}