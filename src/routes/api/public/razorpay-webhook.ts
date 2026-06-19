import { createFileRoute } from "@tanstack/react-router";
import { createHmac, timingSafeEqual } from "crypto";

export const Route = createFileRoute("/api/public/razorpay-webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
        if (!secret) {
          return new Response("Webhook secret not configured", { status: 500 });
        }
        const signature = request.headers.get("x-razorpay-signature") ?? "";
        const body = await request.text();

        const expected = createHmac("sha256", secret).update(body).digest("hex");
        const a = Buffer.from(expected);
        const b = Buffer.from(signature);
        if (a.length !== b.length || !timingSafeEqual(a, b)) {
          return new Response("Invalid signature", { status: 401 });
        }

        let payload: any;
        try {
          payload = JSON.parse(body);
        } catch {
          return new Response("Bad JSON", { status: 400 });
        }

        const event: string = payload?.event ?? "";
        const orderEntity =
          payload?.payload?.payment?.entity ?? payload?.payload?.order?.entity ?? {};
        const orderId: string | undefined = orderEntity.order_id ?? orderEntity.id;
        const paymentId: string | undefined =
          payload?.payload?.payment?.entity?.id;
        const errorReason: string | undefined =
          payload?.payload?.payment?.entity?.error_description;

        if (!orderId) return new Response("ok", { status: 200 });

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

        if (event === "payment.captured" || event === "order.paid") {
          await supabaseAdmin
            .from("payments")
            .update({
              status: "paid",
              razorpay_payment_id: paymentId ?? null,
              error_reason: null,
            })
            .eq("razorpay_order_id", orderId)
            .neq("status", "paid");
        } else if (event === "payment.failed") {
          await supabaseAdmin
            .from("payments")
            .update({
              status: "failed",
              error_reason: errorReason ?? "payment.failed",
            })
            .eq("razorpay_order_id", orderId)
            .neq("status", "paid");
        }

        return new Response("ok", { status: 200 });
      },
    },
  },
});
