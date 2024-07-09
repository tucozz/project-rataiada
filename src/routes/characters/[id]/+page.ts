import { _identitySchema } from '$lib/components/routes/characters/[id]/_pages/home/character-identity';
import { db } from '$lib/database';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { error } from '@sveltejs/kit';

export const prerender = false;

export const load = async ({ params }) => {
	const character = await db.characters.get(params.id);
	if (!character) error(404, 'Character not found');

	const identityForm = await superValidate(zod(_identitySchema));

	return {
		identityForm
	};
};
