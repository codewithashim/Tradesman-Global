import { siFacebook, siInstagram, siTiktok, siWhatsapp, siYoutube, type SimpleIcon } from "simple-icons";
import type { SocialNetwork } from "@/lib/constants/site";

const icons: Record<SocialNetwork, SimpleIcon> = {
  facebook: siFacebook,
  youtube: siYoutube,
  whatsapp: siWhatsapp,
  tiktok: siTiktok,
  instagram: siInstagram,
};

/** Official brand glyph (simple-icons, CC0), drawn in currentColor. */
export function SocialIcon({ network, className }: { network: SocialNetwork; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d={icons[network].path} />
    </svg>
  );
}
