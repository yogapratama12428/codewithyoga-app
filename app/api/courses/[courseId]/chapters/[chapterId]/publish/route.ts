import { NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { db } from "@/app/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { getUser } = getKindeServerSession();

    const user = await getUser();

    
    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    } 

    const ownCourse = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: user.id
      }
    });

    if (!ownCourse) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const chapter = await db.chapter.findUnique({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      }
    });

    // const muxData = await db.muxData.findUnique({
    //   where: {
    //     chapterId: params.chapterId,
    //   }
    // });

    // if (!chapter || !muxData || !chapter.title || !chapter.description || !chapter.videoUrl) {
    //   return new NextResponse("Missing required fields", { status: 400 });
    // }

    const publishedChapter = await db.chapter.update({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
      data: {
        isPublished: true,
      }
    });

    return NextResponse.json(publishedChapter);
  } catch (error) {
    console.log("[CHAPTER_PUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 }); 
  }
}