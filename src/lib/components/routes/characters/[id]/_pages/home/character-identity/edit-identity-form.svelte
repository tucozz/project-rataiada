<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import * as Form from '$lib/components/ui/form';
	import {
		superForm,
		setMessage,
		setError,
		type SuperValidated,
		type Infer
	} from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { _identitySchema } from './identity-schema.js';
	import { db, type Character } from '$lib/database';
	import { Button } from '$lib/components/ui/button';
	import { goto } from '$app/navigation';
	import Icon from '@iconify/svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';

	export let dataForm: SuperValidated<Infer<typeof _identitySchema>>;
	export let character: Character;
	export const submitForm = () => {
		form.submit();
	};

	const form = superForm(dataForm, {
		dataType: 'json',
		SPA: true,
		validators: zod(_identitySchema),
		onUpdate: async ({ form }) => {
			if (!form.valid) {
				setError(form, 'Invalid form data. Please check the fields.');
				return;
			}

			db.characters
				.update(character.id, {
					identity_name: form.data.identity_name,
					identity_background: form.data.identity_background,
					identity_birthsign: form.data.identity_birthsign,
					identity_coat: form.data.identity_coat,
					identity_look: form.data.identity_look
				})
				.then(() => {
					setMessage(form, 'Character created!');
				})
				.catch((error) => {
					setError(form, error.message);
					console.error(error);
				});
		}
	});

	const { form: formData, enhance } = form;

	$formData.identity_name = character.identity_name;
	$formData.identity_background = character.identity_background;
	$formData.identity_birthsign = character.identity_birthsign;
	$formData.identity_coat = character.identity_coat;
	$formData.identity_look = character.identity_look;

	const handleRemove = () => {
		db.characters.delete(character.id);
		goto('/');
	};
</script>

<form method="POST" use:enhance>
	<Button
		type="button"
		variant="destructive"
		aria-label="Remove"
		class="w-full"
		on:click={handleRemove}
	>
		<div class="flex justify-center items-center">
			<Icon icon="fluent:delete-28-regular" width="1.7rem" height="1.7rem" />
		</div>
		<span class="flex-1">Delete {character.identity_name}</span>
	</Button>
	<Separator class="my-8" />
	<Form.Field {form} name="identity_name">
		<Form.Control let:attrs>
			<Form.Label>Name</Form.Label>
			<Input {...attrs} bind:value={$formData.identity_name} />
		</Form.Control>
		<Form.Description>This is your character's name.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="identity_background">
		<Form.Control let:attrs>
			<Form.Label>Background</Form.Label>
			<Input {...attrs} bind:value={$formData.identity_background} />
		</Form.Control>
		<Form.Description>This is your character's background.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="identity_birthsign">
		<Form.Control let:attrs>
			<Form.Label>Birthsign</Form.Label>
			<Input {...attrs} bind:value={$formData.identity_birthsign} />
		</Form.Control>
		<Form.Description>This is your character's birthsign.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="identity_coat">
		<Form.Control let:attrs>
			<Form.Label>Coat</Form.Label>
			<Input {...attrs} bind:value={$formData.identity_coat} />
		</Form.Control>
		<Form.Description>This is your character's coat.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="identity_look">
		<Form.Control let:attrs>
			<Form.Label>Look</Form.Label>
			<Input {...attrs} bind:value={$formData.identity_look} />
		</Form.Control>
		<Form.Description>This is your character's look.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
</form>
