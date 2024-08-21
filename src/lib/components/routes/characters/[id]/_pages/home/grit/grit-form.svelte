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
	import { _gritSchema } from './grit-schema';
	import { db, type Character } from '$lib/database';
	import { Counter } from '$lib/components/ui/counter';

	export let dataForm: SuperValidated<Infer<typeof _gritSchema>>;
	export let character: Character;

	export const submitForm = () => {
		form.submit();
	};

	const form = superForm(dataForm, {
		dataType: 'json',
		SPA: true,
		validators: zod(_gritSchema),
		onUpdate: async ({ form }) => {
			if (!form.valid) {
				setError(form, 'Invalid grit. Please check again.');
				return;
			}

			db.characters
				.update(character.id, {
					stats_gritpoints: form.data.current
				})
				.then(() => {
					setMessage(form, 'Grit updated!');
				})
				.catch((error) => {
					setError(form, error.message);
					console.error(error);
				});
		}
	});

	const { form: formData, enhance } = form;

	$formData.current = character.stats_gritpoints;
</script>

<form method="POST" use:enhance>
	<div class="flex items-center justify-center">
		<Form.Field {form} name="current">
			<Form.Control let:attrs>
				<Form.Label class="hidden">Grit</Form.Label>
				<div class="w-full">
					<div class="mx-auto w-min">
						<Counter
							{...attrs}
							bind:value={$formData.current}
							placeholder="0"
							direction="horizontal"
						/>
					</div>
				</div>
			</Form.Control>
			<Form.Description>This is your character's current grit.</Form.Description>
			<Form.FieldErrors />
		</Form.Field>
	</div>
</form>
