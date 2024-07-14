import { db } from "@/app/lib/db"
import { getProgress } from "./get-progress"

type getCourseDetails = {
    slug: string,
    userId: string | any,
}


export const getCourseDetails = async ({
    slug,
    userId,
}: getCourseDetails) => {
    try {
        const course = await db.course.findUnique({
            where: {
                slug
            },
            include: {
                chapters: {
                    where: {
                        isPublished: true
                    }
                },
                category: {
                    select: {
                        name: true
                    }
                }
            }
        })

        const progressPercentage = await getProgress(userId, course?.id)

        return {
            ...course,
            progress:progressPercentage,
        }

    } catch (error) {
        console.log("[GET_COURSES_DETAILS]", error);
    }
}