import { handleContact, respond } from "~/lib/lead-actions.server";
import type { Route } from "./+types/api.contact";

export async function action({ request }: Route.ActionArgs) {
  return respond(request, await handleContact(request), "contact");
}

export function loader() {
  return new Response("Method Not Allowed", { status: 405, headers: { Allow: "POST" } });
}
