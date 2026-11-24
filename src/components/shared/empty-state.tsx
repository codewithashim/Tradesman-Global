import type { ReactNode } from "react";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-3xl border border-dashed border-primary/25 bg-card/70 px-6 py-20 text-center">
      {icon && <div className="mb-2 grid size-16 place-items-center rounded-2xl bg-sky text-primary">{icon}</div>}
      <h3 className="text-xl font-bold text-navy">{title}</h3>
      {description && <p className="max-w-sm text-sm text-muted-foreground">{description}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
