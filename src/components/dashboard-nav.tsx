"use client";

import type { Icon } from "@/components/icons";
import { Icons } from "@/components/icons";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type NavigationItem = {
  title: string;
  href: string;
  disabled?: boolean;
  icon: Icon;
};

export const navigationItems: NavigationItem[] = [
  {
    title: "Hjem",
    href: "/dashboard",
    icon: Icons.Logo,
  },
  {
    title: "RSVP",
    href: "/dashboard/rsvp",
    icon: Icons.Rsvp,
  },
  {
    title: "Gjestebok",
    href: "/dashboard/guestbook",
    icon: Icons.Post,
  },

  {
    title: "Last opp bilde",
    href: "/dashboard/image-upload",
    icon: Icons.Media,
  },
  {
    title: "Innstillinger",
    href: "/dashboard/settings",
    icon: Icons.Settings,
  },
];

export function DashboardNav() {
  const path = usePathname();

  return (
    <nav className="grid items-start gap-1">
      {navigationItems.map((navigationItem, index) => (
        <Link
          key={index}
          href={navigationItem.disabled ? "/" : navigationItem.href}
        >
          <span
            className={clsx(
              "group flex items-center rounded-md px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100",
              path === navigationItem.href ? "bg-slate-200" : "transparent",
              navigationItem.disabled && "cursor-not-allowed opacity-50"
            )}
          >
            <navigationItem.icon className="mr-2 h-4 w-4" />
            <span>{navigationItem.title}</span>
          </span>
        </Link>
      ))}
    </nav>
  );
}
