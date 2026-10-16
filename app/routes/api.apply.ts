import { handleApplication, respond } from "~/lib/lead-actions.server";
import type { Route } from "./+types/api.apply";

export async function action({ request }: Route.ActionArgs) {
  return respond(request, await handleApplication(request), "apply");
}

export function loader() {
  return new Response("Method Not Allowed", { status: 405, headers: { Allow: "POST" } });
}
