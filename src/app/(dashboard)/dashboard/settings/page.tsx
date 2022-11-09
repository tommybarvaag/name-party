import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { UserNameForm } from "@/components/user-name-form";
import { STRING_CONSTANTS } from "@/constants/stringConstants";
import { authOptions } from "@/lib/auth";
import { getUser } from "@/utils/userUtils";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const user = await getUser();

  if (!user) {
    redirect(authOptions.pages?.signIn ?? "/");
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
