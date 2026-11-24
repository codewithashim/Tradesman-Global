import { PublicLayout } from "@/components/layouts/public-layout";
import { NotFoundView } from "@/components/shared/not-found-view";

// Unmatched URLs render outside any route group, so wrap in the public shell here.
export default function NotFound() {
  return (
    <PublicLayout>
      <NotFoundView />
    </PublicLayout>
  );
}
