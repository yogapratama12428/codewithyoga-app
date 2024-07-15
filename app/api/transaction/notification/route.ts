import { db } from "@/app/lib/db";
import crypto from "crypto";
import { NextResponse } from "next/server";

const checkSignature = async (data: any) => {
    const { MIDTRANS_SERVERKEY_DEV } = process.env;
  
    const hash = crypto
      .createHash("sha512")
      .update(
        data.order_id +
          data.status_code +
          data.gross_amount +
          MIDTRANS_SERVERKEY_DEV
      )
      .digest("hex");
  
    if (data.signature_key !== hash) {
      return {
        status: "error",
        message: "Invalid Signature Key",
      };
    }
  };
  

export async function POST (req: Request) {
    const data = await req.json();

    console.log('from midtrans:', data);
  
    await checkSignature(data);
  
    let orderId = data.order_id;
    let transactionStatus = data.transaction_status;
    let fraudStatus = data.fraud_status;

    if (transactionStatus == "capture") {
      if (fraudStatus == "accept") {
        // TODO set transaction status on your database to 'success'
        // and response with 200 OK
        // await handleAddCourseToUser(orderId);
        const order = await db.order.findFirst({
          where: {
            orderId: orderId,
          },
        })
    
        console.log('order from notification:', order)

        if(!order) {
          console.log('order not found')
          return NextResponse.json({
            status: "error",
            message: "Order not found",
          })  // or throw an error if you want to stop the execution here
        }

        const addUsertoCourse = await db.purchase.create({
          data: {
            userId: order?.userId,
            courseId: order?.courseId,
          }
        })  

        console.log('purchase from notification:', addUsertoCourse)

        console.log("acceptment")
      }
    } else if (transactionStatus == "settlement") {
      // TODO set transaction status on your database to 'success'
      // and response with 200 OK
      // await handleAddCourseToUser(orderId);
      if (fraudStatus == "accept") {
        // TODO set transaction status on your database to 'success'
        // and response with 200 OK
        // await handleAddCourseToUser(orderId);
        const order = await db.order.findFirst({
          where: {
            orderId: orderId
          },
        })
    
        console.log('order from notification:', order)

        if(!order) {
          console.log('order not found')
          return NextResponse.json({
            status: "error",
            message: "Order not found",
          })  // or throw an error if you want to stop the execution here
        }

        const addUsertoCourse = await db.purchase.create({
          data: {
            userId: order?.userId,
            courseId: order?.courseId,
          }
        })  

        console.log('purchase from notification:', addUsertoCourse)

        console.log("acceptment")
      }
      console.log("settlement")
    } else if (
      transactionStatus == "cancel" ||
      transactionStatus == "deny" ||
      transactionStatus == "expire"
    ) {
      // TODO set transaction status on your database to 'failure'
      // and response with 200 OK
      console.log("cancel")
    } else if (transactionStatus == "pending") {
      // TODO set transaction status on your database to 'pending' / waiting payment
      // and response with 200 OK
      console.log("pending")
    }    
    
    return NextResponse.json({
        status: "Success",
        message: "OK",
    })
    
}
