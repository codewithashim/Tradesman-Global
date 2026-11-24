import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button-link";
import { routes } from "@/lib/constants/routes";

export function NotFoundView() {
  return (
    <Container className="flex flex-col items-start gap-5 py-24">
      <p className="font-mono text-sm font-semibold text-muted-foreground">404</p>
      <h1 className="text-3xl font-bold tracking-tight">We couldn’t find that page</h1>
      <p className="max-w-md text-muted-foreground">
        The trade, country or profile you’re looking for may have moved or no longer exists.
      </p>
      <div className="flex flex-wrap gap-3">
        <ButtonLink href={routes.tradeCategories}>Browse trades</ButtonLink>
        <ButtonLink href={routes.home} variant="outline">
          Go home
        </ButtonLink>
      </div>
    </Container>
  );
}
