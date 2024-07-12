import { Category, Course } from "@prisma/client";
import { getProgress } from "./get-progress";
import { db } from "@/app/lib/db";


type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
};



export const getCoursesNotLogin = async ({}): Promise<CourseWithProgressWithCategory[]> => {
  try {
    const courses = await db.course.findMany({
      include: {
        category: true,
        chapters: {
          where: {
            isPublished: true,
          },
          select: {
            id: true,
          }
        },
      },
      orderBy: {
        createdAt: "desc",
      }
    });

    return courses
  } catch (error) {
    console.log("[GET_COURSES]", error);
    return [];
  }
}