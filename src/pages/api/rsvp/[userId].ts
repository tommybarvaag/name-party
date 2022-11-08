import { getSession } from "@/lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import * as z from "zod";

import { withAuthentication } from "@/lib/api-middleware/with-authentication";
import { withMethods } from "@/lib/api-middleware/with-methods";
import { withUser } from "@/lib/api-middleware/with-user";
import { db } from "@/lib/db";
import { rsvpSchema } from "@/lib/validations/rsvp";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "PATCH") {
    try {
      const session = await getSession({ req });
      const user = session?.user;

      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const body = JSON.parse(req.body);

      const payload = rsvpSchema.parse(body);

      await db.rSVP.upsert({
        where: {
          userId: user.id,
        },
        update: {
          attending: payload.attending,
          guests: payload.guests,
          message: payload.message,
        },
        create: {
          attending: payload.attending,
          guests: payload.guests,
          userId: user.id,
          updatedAt: new Date().toISOString(),
          message: payload.message,
        },
      });

      return res.end();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json(error.issues);
      }

      return res.status(422).end();
    }
  }
}

export default withMethods(["PATCH"], withAuthentication(withUser(handler)));
