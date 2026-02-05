import { db } from "@/app/db/db";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";
import PurchaseReceiptEmail, {
  PurchaseReceiptEmailProps,
} from "@/email/PurchaseReceipt";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const resend = new Resend(process.env.RESEND_API_KEY as string);

export async function POST(req: NextRequest) {
  const event = await stripe.webhooks.constructEvent(
    await req.text(),
    req.headers.get("stripe-signature") as string,
    process.env.STRIPE_WEBHOOK_SECRET_KEY as string
  );

  if (event.type === "charge.succeeded") {
    const charge = event.data.object as Stripe.Charge;
    const productId = charge.metadata.productId as string;
    const email = charge.billing_details?.email as string | undefined;
    const pricePaidInCents = charge.amount;

    const product = await db.product.findUnique({ where: { id: productId } });
    if (!product || !email) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    // Upsert user and get the most recent order
    const {
      orders: [order],
    } = await db.user.upsert({
      where: { email },
      create: { email, orders: { create: { productId, pricePaidInCents } } },
      update: { orders: { create: { productId, pricePaidInCents } } },
      select: { orders: { orderBy: { createdAt: "desc" }, take: 1 } },
    });

    // Create download verification
    const downloadVerification = await db.downloadVerification.create({
      data: {
        productId,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24 hours
      },
    });

    // Prepare props for the email
    const emailProps: PurchaseReceiptEmailProps = {
      product,
      order,
      downloadVerificationId: downloadVerification.id,
    };

    // Send the email
    await resend.emails.send({
      from: `Support <${process.env.SENDER_EMAIL}>`,
      to: email,
      subject: "Order Confirmation",
      react: <PurchaseReceiptEmail {...emailProps} />,
    });
  }

  return new NextResponse();
}
