import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { User } from "@prisma/client";

export const dynamic = "force-dynamic";

async function getUser(userId?: User["id"]) {
  try {
    const user = await db.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        rsvp: true,
      },
    });

    return user;
  } catch (error) {
    console.error(error);
  }
}

export default async function DashboardPage() {
  const currentUser = await getCurrentUser();

  const user = await getUser(currentUser?.id);

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Dashboard"
        text="Fra her kan du finne frem til RSVP, gjestebok, innstillinger, og mer."
      />
    </DashboardShell>
  );
}
