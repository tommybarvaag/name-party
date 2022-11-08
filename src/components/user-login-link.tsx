"use client";

import fetcher from "@/lib/fetcher";
import type { Session } from "next-auth";
import Link from "next/link";
import useSWR from "swr";

type UserLoginLinkProps = React.HTMLAttributes<HTMLAnchorElement>;

export function UserLoginLink({ ...other }: UserLoginLinkProps) {
  const { data, error } = useSWR<Session>("/api/user/session", fetcher);

  return !data && !error ? null : data?.user ? (
    <Link href="/dashboard" className="hover:underline" {...other}>
      Dashboard
    </Link>
  ) : (
    <Link href="/login" className="hover:underline" {...other}>
      Logg inn
    </Link>
  );
}
