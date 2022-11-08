import { notFound } from "next/navigation";

import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { UserNameForm } from "@/components/user-name-form";
import { STRING_CONSTANTS } from "@/constants/stringConstants";
import { getCurrentUser } from "@/lib/session";

async function getUser() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return null;
  }

  return currentUser;
}

export default async function SettingsPage() {
  const user = await getUser();

  if (!user) {
    notFound();
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading={STRING_CONSTANTS.HEADINGS.SETTINGS}
        text="Administrer kontoen din."
      />
      <div className="grid gap-10">
        <UserNameForm
          user={{ id: user.id, name: user.name ?? "Oppdater navn" }}
        />
      </div>
    </DashboardShell>
  );
}
