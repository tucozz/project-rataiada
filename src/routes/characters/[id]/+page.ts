import { _identitySchema } from '$lib/components/routes/characters/[id]/_pages/home/character-identity/index.js';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const prerender = false;

export const load = async () => {
	const identityForm = await superValidate(zod(_identitySchema));

	return {
		identityForm
	};
};
