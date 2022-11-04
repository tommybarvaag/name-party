import { headers } from "next/headers";
import { notFound } from "next/navigation";

import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { UserNameForm } from "@/components/user-name-form";
import { STRING_CONSTANTS } from "@/constants/stringConstants";
import { getSession } from "@/lib/session";

async function getUser() {
  const session = await getSession(headers().get("cookie"));

  if (!session?.user) {
    return null;
  }

  return session.user;
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
