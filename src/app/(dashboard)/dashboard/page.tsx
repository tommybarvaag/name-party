import { headers } from "next/headers";

import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { db } from "@/lib/db";
import { getSession } from "@/lib/session";

export const dynamic = "force-dynamic";

async function getUser() {
  const session = await getSession(headers().get("cookie"));

  const user = await db.user.findFirst({
    where: {
      email: session?.user?.email,
    },
    include: {
      rsvp: true,
    },
  });

  return user;
}

export default async function DashboardPage() {
  const user = await getUser();

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Dashboard"
        text="Fra her kan du finne frem til RSVP, gjestebok, innstillinger, og mer."
      />
    </DashboardShell>
  );
}
