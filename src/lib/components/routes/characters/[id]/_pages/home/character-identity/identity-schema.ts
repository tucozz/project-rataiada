import { z } from 'zod';

export const _identitySchema = z.object({
	identity_name: z.string().min(2),
	identity_background: z.string().min(2),
	identity_birthsign: z.string().min(2),
	identity_coat: z.string().min(2),
	identity_look: z.string().min(2)
});
