import { z } from 'zod';

export const _xpSchema = z.object({
	current: z.coerce.number().int().min(0)
});
