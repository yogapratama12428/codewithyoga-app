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

        const purchase = await db.purchase.findFirst({
            where: {
                userId: userId,
                courseId: (course?.id as string),
                
            }
          });

        return {
            ...course,
            progress:progressPercentage,
            purchase
        }

    } catch (error) {
        console.log("[GET_COURSES_DETAILS]", error);
    }
}