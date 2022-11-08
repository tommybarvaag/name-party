import { Icons } from "@/components/icons";
import { authOptions } from "@/lib/auth";
import Link from "next/link";

export default function IndexPage() {
  return (
    <section className="max-w-36 flex max-w-xl flex-col space-y-2 text-center">
      <Icons.Header className="mx-auto h-80 w-80 md:h-[36rem] md:w-[36rem]" />
      <h1 className="text-2xl font-bold">Invitasjon</h1>
      <p className="text-sm text-slate-500">
        Vi ønsker å invitere deg/dere til å bli med i vår navnefest for Helene
        og Ulrik lørdag 11. mars 2023.
      </p>
      <h2>S.u. lørdag 14. januar 2023</h2>
      <p className="text-sm text-slate-500">
        Du kar mulighet til å melde din ankomst ved å{" "}
        <Link
          href={authOptions?.pages?.signIn ?? "/login"}
          className="underline hover:text-brand"
        >
          logge inn med e-post
        </Link>
        , eller ved å sende en SMS til{" "}
        <a
          href="sms:+4794816764?&body=Hei Ane, vi ønsker gjerne å delta på navnefesten til Helene og Ulrik!"
          className="underline hover:text-brand"
        >
          Ane
        </a>
        . Vi håper du velger å logge inn, slik at du får mulighet til å laste
        opp bilder du tar på festen, og skrive et innlegg i gjesteboken.
      </p>
    </section>
  );
}
