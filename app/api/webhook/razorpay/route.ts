import { NextResponse } from "next/server";
import crypto from "crypto";
import { createOrder } from "@/lib/actions/order.actions";


export async function POST(req: Request) {
  try {
    const rawBody = await req.text();

    const data = JSON.parse(rawBody);
    const razorpay_signature = req.headers.get("x-razorpay-signature");

    const razorpayApiSecret = process.env.RAZORPAY_WEBHOOK_SECRET!;

    const expectedSignature = crypto
      .createHmac("sha256", razorpayApiSecret)
      .update(rawBody)
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      const order = {
        razorpayId: data.payload.payment.entity.id,
        eventId: data.payload.payment.entity.notes.eventId,
        buyerId: data.payload.payment.entity.notes.buyerId,
        totalAmount: data.payload.payment.entity.amount ? (data.payload.payment.entity.amount / 100).toString() : '0',
        createdAt: new Date()
      }

      const newOrder = await createOrder(order)

      return NextResponse.json(
        { message: "Payment verified and saved successfully", order: newOrder },
        { status: 200 }
      );
    } else {
      console.error("Payment verification failed");
      return NextResponse.json(
        { message: "Payment verification failed" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      {
        message: "Server error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
