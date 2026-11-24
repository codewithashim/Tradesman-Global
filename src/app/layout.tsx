import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Noto_Sans_Bengali, Plus_Jakarta_Sans } from "next/font/google";
import { siteConfig } from "@/lib/constants/site";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

// Display face for headlines: a grotesque with a hand-cut, workshop character.
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

// Bangla copy falls back to this face automatically (Jakarta has no Bengali glyphs).
const notoBengali = Noto_Sans_Bengali({
  variable: "--font-noto-bengali",
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: { default: siteConfig.name, template: `%s · ${siteConfig.name}` },
  description: siteConfig.description,
};

export const viewport: Viewport = {
  themeColor: "#f5f8fc",
  // Lets the mobile bottom navigation extend under the home indicator (uses safe-area insets).
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className={`${jakarta.variable} ${bricolage.variable} ${notoBengali.variable} h-full`}>
      <head>
        {/* Marks JS as available so intro text can wait for its animation instead of flashing. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js-anim')" }} />
      </head>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
