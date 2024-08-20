import { z } from 'zod';

export const _pipsSchema = z.object({
	current: z.coerce.number().int().min(0)
});
