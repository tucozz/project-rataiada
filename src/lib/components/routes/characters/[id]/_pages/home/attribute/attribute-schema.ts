import {z} from 'zod';

export const _attributeSchema = z.object({
    attribute_name: z.string().min(2),
    attribute_value: z.number().int().min(1).max(19)
});