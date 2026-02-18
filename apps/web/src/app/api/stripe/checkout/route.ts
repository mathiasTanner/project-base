import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

export async function POST() {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: "Missing STRIPE_SECRET_KEY" },
      { status: 500 }
    );
  }

  // Skeleton: uses a placeholder price. You’ll swap this per project.
  const priceId = process.env.STRIPE_PRICE_ID;

  if (!priceId) {
    return NextResponse.json(
      { error: "Missing STRIPE_PRICE_ID (add it for your project)" },
      { status: 500 }
    );
  }

  const stripe = getStripe();

  const session = await stripe.checkout.sessions.create({
    mode: "subscription", // change to "payment" for one-off purchases
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${appUrl}/?checkout=success`,
    cancel_url: `${appUrl}/?checkout=cancel`,
  });

  return NextResponse.json({ url: session.url });
}
