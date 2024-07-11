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
	import { _xpSchema } from './xp-schema';
	import { db, type Character } from '$lib/database';
	import { Input } from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';

	export let dataForm: SuperValidated<Infer<typeof _xpSchema>>;
	export let character: Character;

	export const submitForm = () => {
		form.submit();
	};

	const form = superForm(dataForm, {
		dataType: 'json',
		SPA: true,
		validators: zod(_xpSchema),
		onUpdate: async ({ form }) => {
			if (!form.valid) {
				setError(form, 'Invalid xp. Please check again.');
				return;
			}

			const xp = form.data.current < 1000
				? 1
				: form.data.current < 3000
					? 2
					: form.data.current < 6000
						? 3
						: Math.floor(4 + (form.data.current - 6000) / 5000);

			db.characters
				.update(character.id, {

					stats_experience: form.data.current,
					stats_level: xp
				})
				.then(() => {
					setMessage(form, 'XP updated!');
				})
				.catch((error) => {
					setError(form, error.message);
					console.error(error);
				});
		}
	});

	const { form: formData, enhance } = form;

	$formData.current = character.stats_experience;
</script>

<form method="POST" use:enhance>
	<div class="flex items-center justify-center space-x-8">
		<Form.Field {form} name="current">
			<Form.Control let:attrs>
				<Form.Label>EXP</Form.Label>
				<Input {...attrs} type="number" bind:value={$formData.current} placeholder="0" />
			</Form.Control>
			<Form.Description>This is your character's current EXP.</Form.Description>
			<Form.FieldErrors />
		</Form.Field>
	</div>
</form>
