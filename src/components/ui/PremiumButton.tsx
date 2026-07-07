import Link from "next/link";
import { cn } from "@/lib/utils";

type PremiumButtonProps = {
  href: string;
  className?: string;
  children: React.ReactNode;
};

export default function PremiumButton({
  href,
  className,
  children,
}: PremiumButtonProps) {
  return (
    <Link href={href} className={cn("premium-button", className)}>
      {children}
    </Link>
  );
}
