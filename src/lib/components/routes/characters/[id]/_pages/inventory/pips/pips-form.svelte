<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import {
		superForm,
		setMessage,
		setError,
		type SuperValidated,
		type Infer
	} from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { _pipsSchema } from './pips-schema';
	import { db, type Character } from '$lib/database';
	import { Input } from 'flowbite-svelte';

	export let dataForm: SuperValidated<Infer<typeof _pipsSchema>>;
	export let character: Character;

	export const submitForm = () => {
		form.submit();
	};

	const form = superForm(dataForm, {
		dataType: 'json',
		SPA: true,
		validators: zod(_pipsSchema),
		onUpdate: async ({ form }) => {
			if (!form.valid) {
				setError(form, 'Invalid pips. Please choose a number between 0 and 250.');
				return;
			}

			db.characters
				.update(character.id, {
					inventory_pips: form.data.current
				})
				.then(() => {
					setMessage(form, 'Pips updated!');
				})
				.catch((error) => {
					setError(form, error.message);
					console.error(error);
				});
		}
	});

	const { form: formData, enhance } = form;

	$formData.current = character.inventory_pips;
</script>

<form method="POST" use:enhance>
	<div class="flex items-center justify-center space-x-8">
		<Form.Field {form} name="current">
			<Form.Control let:attrs>
				<Form.Label>Pips</Form.Label>
				<Input {...attrs} type="number" bind:value={$formData.current} placeholder="0" />
			</Form.Control>
			<Form.Description>This is your character's current pips.</Form.Description>
			<Form.FieldErrors />
		</Form.Field>
	</div>
</form>
