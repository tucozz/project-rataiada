<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import * as Form from '$lib/components/ui/form';
	import NewCharacterFormStats from '$lib/components/routes/new-character-form-stats.svelte';
	import {
		superForm,
		setMessage,
		setError,
		type SuperValidated,
		type Infer
	} from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { _characterSchema } from './+page.js';
	import { createEventDispatcher } from 'svelte';
	import { db } from '$lib/database';

	export let dataForm: SuperValidated<Infer<typeof _characterSchema>>;
	export const submitForm = () => {
		form.submit();
	};

	const dispatch = createEventDispatcher<{
		submited: { characterId: string };
	}>();

	const form = superForm(dataForm, {
		dataType: 'json',
		SPA: true,
		validators: zod(_characterSchema),
		onUpdate: async ({ form }) => {
			if (!form.valid) {
				setError(form, 'Invalid form data. Please check the fields.');
				return;
			}

			db.characters
				.put({
					id: crypto.randomUUID(),
					identity_name: form.data.identity_name,
					identity_background: form.data.identity_background,
					identity_birthsign: form.data.identity_birthsign,
					identity_coat: form.data.identity_coat,
					identity_look: form.data.identity_look,
					stats_level: 1,
					stats_experience: 0,
					stats_gritpoints: 1,
					stats_strength_curr: form.data.stats_strength,
					stats_strength_max: form.data.stats_strength,
					stats_dexterity_curr: form.data.stats_dexterity,
					stats_dexterity_max: form.data.stats_dexterity,
					stats_willpower_curr: form.data.stats_willpower,
					stats_willpower_max: form.data.stats_willpower,
					stats_healthpoints_curr: form.data.stats_healthpoints,
					stats_healthpoints_max: form.data.stats_healthpoints,
					inventory_pips: form.data.inventory_pips,
					bank_pips: 0
				})
				.then((characterId) => {
					setMessage(form, 'Character created!');
					dispatch('submited', {
						characterId
					});
				})
				.catch((error) => {
					setError(form, error.message);
					console.error(error);
				});
		}
	});

	const { form: formData, enhance } = form;

	$formData.stats_strength = 0;
	$formData.stats_dexterity = 0;
	$formData.stats_willpower = 0;
	$formData.stats_healthpoints = 0;
</script>

<form method="POST" use:enhance>
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
	<div>
		<div>
			<p>Strength</p>
			<NewCharacterFormStats
				{form}
				name="stats_strength"
				bind:value={$formData.stats_strength}
			/>
		</div>
		<div>
			<p>Dexterity</p>
			<NewCharacterFormStats
				{form}
				name="stats_dexterity"
				bind:value={$formData.stats_dexterity}
			/>
		</div>
		<div>
			<p>Willpower</p>
			<NewCharacterFormStats
				{form}
				name="stats_willpower"
				bind:value={$formData.stats_willpower}
			/>
		</div>
		<div>
			<p>Health</p>
			<NewCharacterFormStats
				{form}
				name="stats_healthpoints"
				bind:value={$formData.stats_healthpoints}
			/>
		</div>
	</div>
	<Form.Field {form} name="inventory_pips">
		<Form.Control let:attrs>
			<Form.Label>Pips</Form.Label>
			<Input {...attrs} type="number" bind:value={$formData.inventory_pips} placeholder="0" />
		</Form.Control>
		<Form.Description>This is your character's initial pips.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
</form>
