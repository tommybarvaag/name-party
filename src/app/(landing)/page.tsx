import { Icons } from "@/components/icons";

export default function IndexPage() {
  return (
    <section className="flex flex-col space-y-2 text-center">
      <Icons.Logo className="mx-auto h-6 w-6" />
      <h1 className="text-2xl font-bold">Invitasjon</h1>
      <p className="text-sm text-slate-500">
        Vi øsnker å invidere deg/dere til å bli med i vår navnefest for Helene
        og Ulrik den 03.03.2023.
      </p>
    </section>
  );
}
