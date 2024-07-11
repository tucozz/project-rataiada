<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import * as Form from '$lib/components/ui/form';
	import * as Select from '$lib/components/ui/select/index.js';
	import {
		superForm,
		setMessage,
		setError,
		type SuperValidated,
		type Infer
	} from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { _characterItemSchema } from './schemas.js';
	import { db, type Character, type CharacterItem } from '$lib/database';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { VerticalCounter } from '$lib/components/ui/vertical-counter';
	import { liveQuery } from 'dexie';

	export let dataForm: SuperValidated<Infer<typeof _characterItemSchema>>;
	export let character: Character;
	export let characterItem: CharacterItem;

	export const submitForm = () => {
		form.submit();
	};

	const form = superForm(dataForm, {
		dataType: 'json',
		SPA: true,
		validators: zod(_characterItemSchema),
		onUpdate: async ({ form }) => {
			if (!form.valid) {
				setError(form, 'Invalid form data. Please check the fields.');
				return;
			}

			if (originPlace !== form.data.place) {
				// check if any of the items in the destination place overlap with the current item
				const destItems = $destinationPlaceCharacterItems;

				const overlap = destItems.find((item) => {
					const originTop = item.gridPositionTop;
					const originLeft = item.gridPositionLeft;
					const originWidth = item.width;
					const originHeight = item.height;

					const destTop = form.data.gridPositionTop;
					const destLeft = form.data.gridPositionLeft;
					const destWidth = characterItem.width;
					const destHeight = characterItem.height;

					return (
						originTop < destTop + destHeight &&
						originTop + originHeight > destTop &&
						originLeft < destLeft + destWidth &&
						originLeft + originWidth > destLeft
					);
				});

				if (overlap) {
					setError(form, 'The item overlaps with another item in the destination place.');
					return;
				}

				const selectKeyFromPlace = (place: typeof form.data.place) => {
					switch (place) {
						case 'main_body':
							return 'inventory_items_main_body';
						case 'pack':
							return 'inventory_items_pack';
						case 'bank':
							return 'bank_items';
						case 'grit':
							return 'grit_ignored_conditions_items';
					}
				};

				const originKey = selectKeyFromPlace(originPlace);
				const destKey = selectKeyFromPlace(form.data.place);

				db.characters.update(
					character.id,
					{
						[originKey]: character[originKey].filter((itemId) => itemId !== characterItem.id),
						[destKey]: [...character[destKey], characterItem.id]
					} as unknown as Partial<Character> /* avoids crazy noonsense type error introduced after including an Array (inventory_items) to Character schema TYPEERR-001 */
				);
			}

			db.characterItems
				.update(characterItem.id, {
					gridPositionTop: form.data.gridPositionTop,
					gridPositionLeft: form.data.gridPositionLeft
				})
				.then(() => {
					setMessage(form, 'Character item updaed!');
				})
				.catch((error) => {
					setError(form, error.message);
					console.error(error);
				});
		}
	});

	let originPlace: typeof $formData.place;
	$: originPlace = character.inventory_items_main_body.find((itemId) => itemId === characterItem.id)
		? 'main_body'
		: character.inventory_items_pack.find((itemId) => itemId === characterItem.id)
			? 'pack'
			: character.bank_items.find((itemId) => itemId === characterItem.id)
				? 'bank'
				: character.grit_ignored_conditions_items.find((itemId) => itemId === characterItem.id)
					? 'grit'
					: 'main_body';

	$: selectedPlace = $formData.place
		? {
				label: $formData.place,
				value: $formData.place
			}
		: undefined;

	let destinationPlaceCharacterItems = liveQuery(() => {
		return db.characterItems
			.where('id')
			.anyOf(
				'main_body'
					? character.inventory_items_main_body
					: 'pack'
						? character.inventory_items_pack
						: 'bank'
							? character.bank_items
							: 'grit'
								? character.grit_ignored_conditions_items
								: []
			)
			.and((item) => item.id !== characterItem.id)
			.toArray();
	});

	const { form: formData, enhance } = form;

	$formData.usages = characterItem.usages;
	$formData.gridPositionTop = characterItem.gridPositionTop;
	$formData.gridPositionLeft = characterItem.gridPositionLeft;
	$formData.place = originPlace;

	const handleDelete = () => {
		db.characterItems.delete(characterItem.id);

		console.log('Item deleted');
	};
</script>

<form method="POST" use:enhance>
	<Button type="button" variant="destructive" on:click={handleDelete}>Delete</Button>
	<Separator />
	<Form.Field {form} name="usages">
		<Form.Control let:attrs>
			<Form.Label>Usages</Form.Label>
			<VerticalCounter
				{...attrs}
				bind:value={$formData.usages}
				maxDisabeled={characterItem.usagesTotal}
			/>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Separator />
	<Form.Field {form} name="gridPositionTop">
		<Form.Control let:attrs>
			<Form.Label>Place</Form.Label>
			<Select.Root
				selected={selectedPlace}
				onSelectedChange={(v) => {
					v && ($formData.place = v.value);
				}}
			>
				<Select.Trigger {...attrs}>
					<Select.Value placeholder="Select a place" />
				</Select.Trigger>
				<Select.Content>
					<Select.Item value="main_body" label="Main body" />
					<Select.Item value="pack" label="Pack" />
					<Select.Item value="bank" label="Bank" />
					<Select.Item value="grit" label="Ignored conditions" />
				</Select.Content>
			</Select.Root>
			<input hidden bind:value={$formData.place} name={attrs.name} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="gridPositionTop">
		<Form.Control let:attrs>
			<Form.Label>Top</Form.Label>
			<Input {...attrs} type="number" bind:value={$formData.gridPositionTop} placeholder="0" />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="gridPositionLeft">
		<Form.Control let:attrs>
			<Form.Label>Left</Form.Label>
			<Input {...attrs} type="number" bind:value={$formData.gridPositionLeft} placeholder="0" />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
</form>
