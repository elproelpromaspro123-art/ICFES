export const dynamic = "force-static";

export function GET() {
  return new Response("google-site-verification: google71ceeb3f99150953.html", {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
