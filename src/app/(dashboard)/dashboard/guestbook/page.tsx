import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { authOptions } from "@/lib/auth";
import { getUser } from "@/utils/userUtils";
import { redirect } from "next/navigation";

export default async function GuestbookPage() {
  const user = await getUser();

  if (!user) {
    redirect(authOptions.pages?.signIn ?? "/");
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Gjestebok" text="Send en hilsen til oss!">
        <button className="inline-flex items-center justify-center rounded-lg bg-[#24292F] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#24292F]/90 focus:outline-none focus:ring-4 focus:ring-[#24292F]/50 disabled:opacity-50 dark:hover:bg-[#050708]/30 dark:focus:ring-slate-500">
          Lag innlegg
        </button>
      </DashboardHeader>
    </DashboardShell>
  );
}
