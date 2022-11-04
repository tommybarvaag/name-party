import * as z from "zod";

export const rsvpSchema = z.object({
  attending: z.boolean(),
  guests: z.number().min(0),
  message: z.string().min(0).max(500),
});
