import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Dashboard"
        text="Fra her kan du finne frem til RSVP, gjestebok, innstillinger, og mer."
      />
    </DashboardShell>
  );
}
