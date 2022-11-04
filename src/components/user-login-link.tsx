"use client";

import fetcher from "@/lib/fetcher";
import { User } from "@prisma/client";
import Link from "next/link";
import useSWR from "swr";

type UserLoginLinkProps = React.HTMLAttributes<HTMLAnchorElement>;

export function UserLoginLink({ ...other }: UserLoginLinkProps) {
  const { data, error } = useSWR<User>("/api/user", fetcher);

  return !data && !error ? null : data?.id ? (
    <Link href="/dashboard" className="hover:underline" {...other}>
      Dashboard
    </Link>
  ) : (
    <Link href="/login" className="hover:underline" {...other}>
      Logg inn
    </Link>
  );
}
