"use client";

import { useId, useTransition, type FormEvent, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Briefcase, Globe2, Loader2, Search, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { routes } from "@/lib/constants/routes";
import type { Option } from "@/types/common";

interface HeroSearchFormProps {
  tradeOptions: Option[];
  countryOptions: Option[];
  experienceOptions: Option[];
}

/** Homepage search → candidate directory with filters pre-applied. */
export function HeroSearchForm({ tradeOptions, countryOptions, experienceOptions }: HeroSearchFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const ids = { trade: useId(), country: useId(), experience: useId() };

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = (key: string) => {
      const v = data.get(key);
      return typeof v === "string" && v ? v : undefined;
    };
    startTransition(() => {
      router.push(routes.findCandidatesFor({ trade: value("trade"), country: value("country"), experience: value("experience") }));
    });
  }

  return (
    <form
      role="search"
      aria-label="Search skilled workers"
      onSubmit={onSubmit}
      className="grid grid-cols-1 gap-2 rounded-3xl bg-card p-2 shadow-float ring-1 ring-border/70 md:grid-cols-[1fr_1fr_1fr_auto]"
    >
      <SearchField id={ids.trade} name="trade" label="Trade category" icon={<Briefcase />} placeholder="Any trade" options={tradeOptions} />
      <SearchField id={ids.country} name="country" label="Preferred country" icon={<Globe2 />} placeholder="Any country" options={countryOptions} />
      <SearchField id={ids.experience} name="experience" label="Experience" icon={<Timer />} placeholder="Any experience" options={experienceOptions} />
      <Button type="submit" size="lg" className="h-14 rounded-2xl px-8 md:h-auto" disabled={isPending}>
        {isPending ? <Loader2 className="animate-spin" /> : <Search />}
        Search
      </Button>
    </form>
  );
}

interface SearchFieldProps {
  id: string;
  name: string;
  label: string;
  icon: ReactNode;
  placeholder: string;
  options: Option[];
}

function SearchField({ id, name, label, icon, placeholder, options }: SearchFieldProps) {
  return (
    <div className="group relative flex items-center gap-3 rounded-2xl px-4 py-2.5 transition-colors focus-within:bg-sky hover:bg-sky/60">
      <span aria-hidden className="grid size-9 shrink-0 place-items-center rounded-xl bg-sky text-primary [&_svg]:size-4">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <label htmlFor={id} className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </label>
        <select
          id={id}
          name={name}
          defaultValue=""
          className="-ml-0.5 w-full cursor-pointer appearance-none truncate bg-transparent pr-2 text-[15px] font-semibold text-navy outline-none"
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
