import { z } from 'zod';

export const _characterItemSchema = z.object({
	usages: z.number().int().min(0),
	gridPositionTop: z.number().int().min(1),
	gridPositionLeft: z.number().int().min(1),
	place: z.enum(['main_body', 'pack', 'bank', 'grit'])
});

export const _itemSchema = z.object({
	name: z.string().min(2).optional(),
	dmgOrDef: z.string().min(2).optional(),
	mechanicDescription: z.string().min(2).optional(),
	clearDescription: z.string().min(2).optional(),
	class: z.string().min(2).optional(),
	usagesTotal: z.number().int().min(1).optional(),
	hasStar: z.boolean(),
	imageBase64: z.string().optional(),
	width: z.number().int().min(1),
	height: z.number().int().min(1),
	backgroundColor: z
		.string()
		.regex(/^#[0-9A-F]{6}$/i)
		.min(2),
	foregroundColor: z
		.string()
		.regex(/^#[0-9A-F]{6}$/i)
		.min(2),
	divider: z.boolean(),
	border: z.boolean()
});
