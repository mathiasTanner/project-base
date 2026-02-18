import { StripeCheckoutButton } from "@/components/stripe-checkout-button";

export default async function Home() {
  const baseUrl = process.env.NEXT_PUBLIC_CMS_URL ?? "http://localhost:1337";

  const res = await fetch(`${baseUrl}/api/health`, {
    // ensure it actually calls Strapi each request in dev
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <main style={{ padding: 24 }}>
        <h1>Web is up ✅</h1>
        <p>But CMS health check failed ❌</p>
        <p>Status: {res.status}</p>
      </main>
    );
  }

  const data = (await res.json()) as { ok: boolean; service: string; time: string };

  return (
    <main style={{ padding: 24 }}>
      <h1>Web is up ✅</h1>
      <h2>CMS connection ✅</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <StripeCheckoutButton />
    </main>
  );
}
