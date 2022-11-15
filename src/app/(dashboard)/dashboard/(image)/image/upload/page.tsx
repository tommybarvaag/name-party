import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import FileUpload from "@/components/file-upload";
import { authOptions } from "@/lib/auth";
import { getUser } from "@/utils/userUtils";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ImageUpload() {
  const user = await getUser();

  if (!user) {
    redirect(authOptions.pages?.signIn ?? "/");
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Last opp bilde"
        text="Send oss bilder, og vi lager en fin collage til festen."
      />
      <FileUpload />
    </DashboardShell>
  );
}
