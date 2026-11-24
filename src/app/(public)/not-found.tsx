import { NotFoundView } from "@/components/shared/not-found-view";

// Rendered inside the (public) layout when a page calls notFound().
export default function NotFound() {
  return <NotFoundView />;
}
