import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';

export const _characterSchema = z.object({
	identity_name: z.string().min(2),
	identity_background: z.string().min(2),
	identity_birthsign: z.string().min(2),
	identity_coat: z.string().min(2),
	identity_look: z.string().min(2),
	stats_strength: z.coerce.number().int().min(0).default(0),
	stats_dexterity: z.coerce.number().int().min(0).default(0),
	stats_willpower: z.coerce.number().int().min(0).default(0),
	stats_healthpoints: z.coerce.number().int().min(0).default(0),
	inventory_pips: z.coerce.number().int().min(0).max(250).default(0)
});

export const load = async () => {
	const form = await superValidate(zod(_characterSchema));

	return { form };
};
