// import Stripe from "stripe";
// import { stripe } from "@/lib/stripe";


import { NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { db } from "@/app/lib/db";
import Midtrans from "midtrans-client";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {

    const { price, courseId} = await req.json();

    const { getUser } = getKindeServerSession();

    const user = await getUser();

    if (!user || !user.id || !user.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        isPublished: true,
      }
    });

    const purchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: params.courseId
        }
      }
    });

    if (purchase) {
      return new NextResponse("Already purchased", { status: 400 });
    }

    if (!course) {
      return new NextResponse("Not found", { status: 404 });
    }

    let snap = new Midtrans.Snap({
      isProduction: false,
      serverKey: process.env.NEXT_PUBLIC_MIDTRANS_SERVER_KEY,
    })

    const payload = {
      transaction_details: {
        order_id: courseId,
        gross_amount: price
      },
      credit_card: {
        secure: true,
      },
    };

    const snapTransaction = await snap.createTransaction(payload);

    console.log(snapTransaction)

    return NextResponse.json({snapTransaction});
  } catch (error) {
    console.log("[COURSE_ID_CHECKOUT]", error);
    return new NextResponse("Internal Error", { status: 500 })
  }
}