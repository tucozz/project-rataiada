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
	import { _attributeSchema } from './attribute-schema';
	import { db, type Character } from '$lib/database';
	import type { OnlyType } from './types';
	import { Separator } from '$lib/components/ui/separator';
	import { Counter } from '$lib/components/ui/counter';

	export let dataForm: SuperValidated<Infer<typeof _attributeSchema>>;
	export let character: Character;

	export let id: string;
	export let max: keyof OnlyType<Character, number>;
	export let curr: keyof OnlyType<Character, number>;

	export const submitForm = () => {
		form.submit();
	};

	const form = superForm(dataForm, {
		id,
		dataType: 'json',
		SPA: true,
		validators: zod(_attributeSchema),
		onUpdate: async ({ form }) => {
			if (!form.valid) {
				setError(form, 'Invalid form data. Please check the fields.');
				return;
			}

			db.characters
				.update(character.id, {
					[max]: form.data.max,
					[curr]: form.data.current
				})
				.then(() => {
					setMessage(form, 'Attribute updated!');
				})
				.catch((error) => {
					setError(form, error.message);
					console.error(error);
				});
		}
	});

	const { form: formData, enhance } = form;

	$formData.max = character[max];
	$formData.current = character[curr];
</script>

<form method="POST" use:enhance>
	<div class="flex items-center justify-center space-x-8">
		<Form.Field {form} name="max">
			<Form.Control let:attrs>
				<Form.Label>Max</Form.Label>
				<Counter {...attrs} bind:value={$formData.max} placeholder="0" direction="vertical" />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Separator orientation="vertical" class="h-32" />
		<Form.Field {form} name="current">
			<Form.Control let:attrs>
				<Form.Label>Current</Form.Label>
				<Counter {...attrs} bind:value={$formData.current} placeholder="0" direction="vertical" />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
	</div>
</form>
