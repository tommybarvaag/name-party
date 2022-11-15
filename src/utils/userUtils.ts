import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { cache } from "react";
import "server-only";

export const getUserById = cache(async (id: string, includeRsvp = true) => {
  const user = await db.user.findFirst({
    where: {
      id: id,
    },
    include: {
      rsvp: includeRsvp,
    },
  });

  return user;
});

export const preloadById = (id: string, includeRsvp = true) => {
  void getUserById(id, includeRsvp);
};

export const getUser = cache(async (includeRsvp = true) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return null;
  }

  const user = await getUserById(currentUser?.id, includeRsvp);

  return user;
});

export const getUserImages = cache(async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return null;
  }

  return db.user.findUnique({
    where: {
      id: currentUser.id,
    },
    include: {
      images: true,
      rsvp: false,
    },
  });
});
