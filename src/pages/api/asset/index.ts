import { getSession } from "@/lib/session";
import type { NextApiRequest, NextApiResponse } from "next";

import { withAuthentication } from "@/lib/api-middleware/with-authentication";
import { withMethods } from "@/lib/api-middleware/with-methods";
import { db } from "@/lib/db";
import { imageSchema } from "@/lib/validations/asset";
import * as z from "zod";

// key value type
type KeyValue = {
  [key: string]: [];
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const session = await getSession({ req });
      const user = session?.user;

      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const body = JSON.parse(req.body);

      const payload = imageSchema.parse(body);

      const image = await db.image.upsert({
        create: {
          id: payload.sanityId,
          extension: payload.extension,
          name: payload.name,
          mimeType: payload.mimeType,
          sanityId: payload.sanityId,
          uploadId: payload.uploadId,
          url: payload.url,
          createdAt: payload.createdAt,
          updatedAt: payload.updatedAt,
          userId: user.id,
        },
        update: {
          extension: payload.extension,
          name: payload.name,
          mimeType: payload.mimeType,
          sanityId: payload.sanityId,
          uploadId: payload.uploadId,
          url: payload.url,
          createdAt: payload.createdAt,
          updatedAt: payload.updatedAt,
          userId: user.id,
        },
        where: {
          id: payload.sanityId,
        },
      });

      return res.status(200).json(image);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json(error.issues);
      }

      return res.status(422).end();
    }
  }
}

export default withMethods(["POST"], withAuthentication(handler));
