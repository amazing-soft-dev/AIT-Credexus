import { handlePartner, respond } from "~/lib/lead-actions.server";
import type { Route } from "./+types/api.partner";

export async function action({ request }: Route.ActionArgs) {
  return respond(request, await handlePartner(request), "partner");
}

export function loader() {
  return new Response("Method Not Allowed", { status: 405, headers: { Allow: "POST" } });
}
