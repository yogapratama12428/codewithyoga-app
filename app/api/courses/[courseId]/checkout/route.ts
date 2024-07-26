import { NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { db } from "@/app/lib/db";
import Midtrans from "midtrans-client";
import { nanoid } from 'nanoid';
import { isProduction } from "@/app/lib/midtrans_status";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {

    const { price, courseId, given_name, email, course_title} = await req.json();

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

    const purchase = await db.purchase.findFirst({
      where: {
          courseId: params.courseId
      }
    });

    if (purchase) {
      return new NextResponse("Already purchased", { status: 400 });
    }

    if (!course) {
      return new NextResponse("Not found", { status: 404 });
    }

    let snap = new Midtrans.Snap({
      isProduction: isProduction,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
    })

    const orderId = `codewithyoga-${nanoid()}`;

    const payload = {
      transaction_details: {
        order_id: orderId,
        gross_amount: price
      },
      item_details:[{
        id: courseId,
        price: price,
        quantity: 1,
        name: `CWY - ${course_title}`,
        category: "Pelajaran"
      }],
      customer_details: {
        first_name: given_name,
        email: email
      }
    }

    const snapTransaction = await snap.createTransaction(payload);

    console.log(snapTransaction)

    const order = await db.order.create({
      data: {
        userId: user.id,
        courseId: courseId,
        orderId: orderId
      }
    })

    console.log('order from checkout:', order)

    const response = {
      status: 'success',
      data: {
        snap_token : snapTransaction.token,
        snap_redirect_url : snapTransaction.redirect_url
      }
    }

    return NextResponse.json(response);

  } catch (error) {
    console.log("[COURSE_ID_CHECKOUT]", error);
    return new NextResponse("Internal Error", { status: 500 })
  }
}