"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { RSVP, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Icons } from "@/components/icons";
import { Card } from "@/components/ui/card";
import toast from "@/components/ui/toast";
import { cn } from "@/lib/utils";
import { rsvpSchema } from "@/lib/validations/rsvp";

interface UserRsvpFormProps extends React.HTMLAttributes<HTMLFormElement> {
  user: Pick<User, "id">;
  rsvp: Pick<RSVP, "attending" | "guests" | "message">;
}

type FormData = z.infer<typeof rsvpSchema>;

export function UserRsvpForm({
  user,
  rsvp,
  className,
  ...other
}: UserRsvpFormProps) {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {
      attending: rsvp?.attending ?? false,
      guests: rsvp?.guests ?? 0,
      message: rsvp?.message ?? "",
    },
  });
  const [isSaving, setIsSaving] = React.useState<boolean>(false);

  async function onSubmit(data: FormData) {
    setIsSaving(true);

    const response = await fetch(`/api/rsvp/${user.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        attending: data.attending,
        guests: data.guests,
        message: data.message,
      }),
    });

    setIsSaving(false);

    if (!response?.ok) {
      return toast({
        title: "Noe gikk galt.",
        message: "Navnet ditt ble ikke oppdatert. Prøv igjen senere.",
        type: "error",
      });
    }

    toast({
      title: "Hurra!",
      message: "Du har meldt deg på navnefesten til Ulrik og Helene! 🎉",
      type: "success",
    });

    router.refresh();
  }

  return (
    <form
      className={cn(className)}
      onSubmit={handleSubmit(onSubmit)}
      {...other}
    >
      <Card>
        <Card.Header>
          <Card.Title>RSVP</Card.Title>
          <Card.Description>
            Vær snill å registrer deg som kommer, og legg til eventuelle gjester
            slik at vi vet hvor mange som kommer. Dersom noen av gjestene dine
            også lager seg en konto, så trenger de ikke å registrere seg på
            nytt.
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <div className="mb-5 flex items-center gap-5">
            <label className="text-sm" htmlFor="name">
              Jeg kommer
            </label>
            <input
              id="attending"
              className="accent-black"
              type="checkbox"
              {...register("attending", {
                setValueAs: (value) => {
                  console.log(value);
                  return value === "on";
                },
              })}
            />
            {errors?.attending && (
              <p className="px-1 text-xs text-red-600">
                {errors.attending.message}
              </p>
            )}
          </div>
          <div className="mb-5 flex items-center gap-5">
            <label className="text-sm" htmlFor="name">
              Jeg tar med meg så mange gjester
            </label>
            <input
              id="guests"
              className="my-0 block h-9 w-[60px] rounded-md border border-slate-300 py-2 px-3 text-sm placeholder:text-slate-400 hover:border-slate-400 focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-800 focus:ring-offset-1"
              type="number"
              {...register("guests", {
                valueAsNumber: true,
              })}
            />
            {errors?.guests && (
              <p className="px-1 text-xs text-red-600">
                {errors.guests.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-5">
            <label className="text-sm" htmlFor="name">
              Melding til oss, f.eks. allergier eller andre spesielle behov
            </label>
            <textarea
              id="message"
              className="my-0 mb-2 block h-9 w-[350px] rounded-md border border-slate-300 py-2 px-3 text-sm placeholder:text-slate-400 hover:border-slate-400 focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-800 focus:ring-offset-1"
              {...register("message")}
            />
            {errors?.message && (
              <p className="px-1 text-xs text-red-600">
                {errors.message.message}
              </p>
            )}
          </div>
        </Card.Content>
        <Card.Footer>
          <button
            type="submit"
            className={cn(
              "relative inline-flex h-9 items-center rounded-md border border-transparent bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2",
              {
                "cursor-not-allowed opacity-60": isSaving,
              },
              className
            )}
            disabled={isSaving}
          >
            {isSaving && (
              <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            <span>Save</span>
          </button>
        </Card.Footer>
      </Card>
    </form>
  );
}
