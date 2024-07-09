<script lang="ts">
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Form from '$lib/components/ui/form/index.js';
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
	import { db } from '$lib/database/index.js';

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
				.add({
					identity_name: form.data.identity_name,
					identity_background: form.data.identity_background,
					identity_birthsign: form.data.identity_birthsign,
					identity_coat: form.data.identity_coat,
					identity_look: form.data.identity_look,
					stats_level: 1,
					stats_experience: 0,
					stats_gritpoints: 1,
					stats_strength_curr: form.data.stats_strength_curr,
					stats_strength_max: form.data.stats_strength_max,
					stats_dexterity_curr: form.data.stats_dexterity_curr,
					stats_dexterity_max: form.data.stats_dexterity_max,
					stats_willpower_curr: form.data.stats_willpower_curr,
					stats_willpower_max: form.data.stats_willpower_max,
					stats_healthpoints_curr: form.data.stats_healthpoints_curr,
					stats_healthpoints_max: form.data.stats_healthpoints_max,
					inventory_pips: form.data.inventory_pips,
					bank_pips: 0
				})
				.then((characterId) => {
					setMessage(form, 'Character created!');
					dispatch('submited', {
						characterId
					});
				});
		}
	});

	const { form: formData, enhance } = form;
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
				form={form}
				maxName="stats_strength_max"
				bind:maxValue={$formData.stats_strength_max}
				currName="stats_strength_curr"
				bind:currValue={$formData.stats_strength_curr}
			/>
		</div>
		<div>
			<p>Dexterity</p>
			<NewCharacterFormStats
				form={form}
				maxName="stats_dexterity_max"
				bind:maxValue={$formData.stats_dexterity_max}
				currName="stats_dexterity_curr"
				bind:currValue={$formData.stats_dexterity_curr}
			/>
		</div>
		<div>
			<p>Willpower</p>
			<NewCharacterFormStats
				form={form}
				maxName="stats_willpower_max"
				bind:maxValue={$formData.stats_willpower_max}
				currName="stats_willpower_curr"
				bind:currValue={$formData.stats_willpower_curr}
			/>
		</div>
		<div>
			<p>Health</p>
			<NewCharacterFormStats
				form={form}
				maxName="stats_healthpoints_max"
				bind:maxValue={$formData.stats_healthpoints_max}
				currName="stats_healthpoints_curr"
				bind:currValue={$formData.stats_healthpoints_curr}
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
