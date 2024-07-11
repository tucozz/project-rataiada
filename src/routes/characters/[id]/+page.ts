import { _identitySchema } from '$lib/components/routes/characters/[id]/_pages/home/character-identity';
import { _attributeSchema } from '$lib/components/routes/characters/[id]/_pages/home/attributes-group';
import { db } from '$lib/database';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { error } from '@sveltejs/kit';
import { _pipsSchema } from '$lib/components/routes/characters/[id]/_pages/inventory/pips/pips-schema';
import { _gritSchema } from '$lib/components/routes/characters/[id]/_pages/home/grit';
import { _xpSchema } from '$lib/components/routes/characters/[id]/_pages/home/xp';

export const prerender = false;

export const load = async ({ params }) => {
	const character = await db.characters.get(params.id);
	if (!character) error(404, 'Character not found');

	const identityForm = await superValidate(zod(_identitySchema));
	const attributeForm = await superValidate(zod(_attributeSchema));
	const pipsForm = await superValidate(zod(_pipsSchema));
	const gritForm = await superValidate(zod(_gritSchema));
	const xpForm = await superValidate(zod(_xpSchema));
	
	return {
		identityForm,
		attributeForm,
		pipsForm,
		gritForm,
		xpForm
	};
};
