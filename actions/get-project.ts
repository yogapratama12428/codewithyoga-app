import { db } from "@/app/lib/db"

export const getProject = async (slug: string) => {
    try {
        const course = await db.course.findUnique({
            where: {
                slug
            },
            select: {
                title: true,
                description: true,
                imageUrl: true
            }
        })
        
        return course
    } catch (error) {
        console.log("[GET_Project_DETAILS]", error);
    }
  
}