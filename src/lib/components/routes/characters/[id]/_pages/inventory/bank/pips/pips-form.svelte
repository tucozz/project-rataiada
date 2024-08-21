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
	import { Button } from '$lib/components/ui/button';
	import Icon from '@iconify/svelte';
	import { Separator } from '$lib/components/ui/separator';

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
				setError(form, 'Invalid pips. Please choose a number above 0.');
				return;
			}

			db.characters
				.update(character.id, {
					bank_pips: form.data.current
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

	$formData.current = character.bank_pips;

	const iconSize = '1.2rem';
</script>

<form method="POST" use:enhance>
	<div class="flex items-center justify-center">
		<Form.Field {form} name="current">
			<Form.Control let:attrs>
				<Form.Label class="hidden">Pips</Form.Label>
				<Input {...attrs} type="number" bind:value={$formData.current} placeholder="0" />
				<div class="py-4">
					<Separator />
				</div>
				<div class="flex justify-center pb-2">
					<div class="flex gap-8">
						{#each [1, 10, 100] as amount}
							<div
								class="max-w-fit flex items-center justify-center rounded-full bg-gray-100 border-[1px] flex-col"
							>
								<Button
									variant="outline"
									size="icon"
									class="h-8 w-8 shrink-0 rounded-full border-0 bg-transparent my-2"
									on:click={() => ($formData.current += amount)}
								>
									<Icon icon="fluent:add-28-filled" width={iconSize} height={iconSize} />
									<span class="sr-only">Increase</span>
								</Button>
								<div class="bg-white border-y-[1px] px-4 py-4">
									<span class="w-4 block text-center">{amount}</span>
								</div>
								<Button
									variant="outline"
									size="icon"
									class="h-8 w-8 shrink-0 rounded-full border-0 bg-transparent my-2"
									on:click={() => ($formData.current -= amount)}
									disabled={$formData.current <= 0}
								>
									<Icon
										icon="fluent:line-horizontal-1-28-filled"
										width={iconSize}
										height={iconSize}
									/>
									<span class="sr-only">Decrease</span>
								</Button>
							</div>
						{/each}
					</div>
				</div>
			</Form.Control>
			<Form.Description>This is your character's current banked pips.</Form.Description>
			<Form.FieldErrors />
		</Form.Field>
	</div>
</form>
