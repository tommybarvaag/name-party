import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { authOptions } from "@/lib/auth";
import { getUserImages } from "@/utils/userUtils";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ImagePage() {
  const user = await getUserImages();

  if (!user) {
    redirect(authOptions.pages?.signIn ?? "/");
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Dine bilder"
        text="Her kan du se dine bilder, og slette de du ikke ønsker å dele."
      />
      <div className="container mx-auto">
        <div className="grid-cols-3 space-y-2 lg:grid lg:grid-rows-3 lg:gap-3 lg:space-y-0">
          {user?.images?.map((image) => (
            <div className="aspect-square w-full">
              <img key={image.sanityId} src={image.url} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
