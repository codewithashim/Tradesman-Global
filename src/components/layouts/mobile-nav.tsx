"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { BrandLogo } from "@/components/shared/brand-logo";
import { routes } from "@/lib/constants/routes";
import { mainNav } from "@/lib/constants/site";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="secondary" size="icon" className="lg:hidden" aria-label="Open menu">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[min(22rem,88vw)] gap-0 border-l-0 bg-background p-0">
        <div className="border-b border-border px-6 py-5" onClick={close}>
          <BrandLogo />
        </div>
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <SheetDescription className="sr-only">Site navigation</SheetDescription>
        <nav aria-label="Mobile" className="flex flex-col p-3">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={close}
              className="flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-semibold text-navy hover:bg-sky"
            >
              {item.label}
              <ArrowRight aria-hidden className="size-4 text-muted-foreground" />
            </Link>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-3 border-t border-border p-6">
          <ButtonLink href={routes.register} size="lg" onClick={close}>
            Create Free Profile
          </ButtonLink>
          <ButtonLink href={routes.login} variant="secondary" size="lg" onClick={close}>
            Log in
          </ButtonLink>
          <p lang="bn" className="pt-1 text-center text-sm text-muted-foreground">
            বিনামূল্যে প্রোফাইল তৈরি করুন
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
