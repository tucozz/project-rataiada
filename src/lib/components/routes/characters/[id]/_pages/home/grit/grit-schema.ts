import { z } from 'zod';

export const _gritSchema = z.object({
	current: z.coerce.number().int().min(0)
});
