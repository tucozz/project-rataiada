import { z } from 'zod';

export const _pipsSchema = z.object({
	current: z.coerce.number().int().max(250).min(0),
});
