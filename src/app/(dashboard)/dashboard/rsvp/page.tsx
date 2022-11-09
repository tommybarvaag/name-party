import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { UserRsvpForm } from "@/components/user-rsvp-form";
import { authOptions } from "@/lib/auth";
import { getUser } from "@/utils/userUtils";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await getUser();

  if (!user) {
    redirect(authOptions.pages?.signIn ?? "/");
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="RSVP"
        text="Meld deg og din familie på navnefesten til Helene og Ulrik."
      />
      <UserRsvpForm
        user={{
          id: user.id,
        }}
        rsvp={{
          attending: user.rsvp?.attending ?? false,
          guests: user.rsvp?.guests ?? 0,
          message: user.rsvp?.message ?? "",
        }}
      />
    </DashboardShell>
  );
}
