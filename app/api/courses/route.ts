import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
import { db } from "../../lib/db";

export async function POST(request: Request) {

    const { getUser } = getKindeServerSession();
    
    const user =  await getUser();
    const { title } = await request.json();

    if(!user) return new NextResponse("Unauthorize", { status : 401} )

    try {
        const course = await db.course.create({
            data: {
                title,
                userId: user.id,
            }
        })

        return new NextResponse(JSON.stringify(course), {
            status: 201,
        });
    } catch (error) {
        console.log("[COURSES]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}