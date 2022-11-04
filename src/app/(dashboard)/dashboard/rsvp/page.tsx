import { headers } from "next/headers";

import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { UserRsvpForm } from "@/components/user-rsvp-form";
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

  console.log(user);

  return (
    <DashboardShell>
      <DashboardHeader
        heading="RSVP"
        text="Meld deg og din familie på navnefesten til Helene og Ulrik."
      />
      <UserRsvpForm
        user={{
          id: user?.id ?? "unknown",
        }}
        rsvp={{
          attending: user?.rsvp?.attending ?? false,
          guests: user?.rsvp?.guests ?? 0,
          message: user?.rsvp?.message ?? "",
        }}
      />
    </DashboardShell>
  );
}
