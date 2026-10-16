import { data, Link } from "react-router";
import { Button } from "~/components/ui/button";
import { seo } from "~/lib/seo";
import type { Route } from "./+types/not-found";

export function loader() {
  return data(null, { status: 404 });
}

export const meta: Route.MetaFunction = () =>
  seo({
    title: "Page not found",
    description: "This page doesn't exist.",
    path: "/404",
    noindex: true,
  });

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[70vh] flex-col items-center justify-center pt-32 text-center">
      <p className="text-accent font-serif text-7xl italic">404</p>
      <h1 className="text-gradient mt-4 text-4xl font-semibold">Page not found</h1>
      <p className="text-muted mt-4 max-w-md">
        The page you're looking for doesn't exist or has moved.
      </p>
      <div className="mt-8 flex gap-3">
        <Button asChild>
          <Link to="/">Back to home</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link to="/jobs">Browse roles</Link>
        </Button>
      </div>
    </section>
  );
}
