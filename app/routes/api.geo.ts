/** Returns the visitor's country from Vercel's edge geo header. Never cached. */
export function loader({ request }: { request: Request }) {
  const country = request.headers.get("x-vercel-ip-country") ?? null;
  return Response.json(
    { country },
    { headers: { "Cache-Control": "private, no-store", Vary: "x-vercel-ip-country" } },
  );
}
