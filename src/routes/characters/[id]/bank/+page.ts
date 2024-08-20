import { _pipsSchema } from '$lib/components/routes/characters/[id]/_pages/inventory/bank/pips';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const prerender = false;

export const load = async () => {
	const pipsForm = await superValidate(zod(_pipsSchema));

	return {
		pipsForm,
	};
};
