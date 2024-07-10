import { z } from 'zod';

export const _attributeSchema = z.object({
	current: z.number().int(),
	max: z.number().int()
});
