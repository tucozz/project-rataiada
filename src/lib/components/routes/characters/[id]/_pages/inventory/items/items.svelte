<script lang="ts">
	import { type SuperValidated, type Infer } from 'sveltekit-superforms';
	import { ItemGrid } from '$lib/components/rataiada/item-grid';
	import { CharacterItemForm, _characterItemSchema } from '$lib/components/rataiada/item-form';
	import { liveQuery } from 'dexie';
	import { db, type Character, type CharacterItem, type Item } from '$lib/database';

	export let data: SuperValidated<Infer<typeof _characterItemSchema>>;
	export let character: Character;

	let mainBodyItemForm: CharacterItemForm;
	let packItemForm: CharacterItemForm;

	let characterItems = liveQuery(() =>
		db.characterItems.where('characterId').equals(character.id).toArray()
	);

	const fvckSvelte = (item: Item & Partial<CharacterItem>) => item as CharacterItem;
</script>

<section>
	{#if $characterItems}
		<div>
			<!-- all main body items  -->
			<ItemGrid
				gridRows={2}
				gridCols={2}
				items={$characterItems.filter((item) =>
					character.inventory_items_main_body.includes(item.id)
				)}
				on:click={() => mainBodyItemForm.submitForm()}
				let:item
			>
				<CharacterItemForm
					bind:this={mainBodyItemForm}
					{character}
					characterItem={fvckSvelte(item)}
					dataForm={data}
				/>
			</ItemGrid>
			<span>
				<b>Carrided:</b> Ready to use.
			</span>
			<span>
				<b>Worn:</b> Quick to ready.
			</span>
		</div>
		<div>
			<!-- all pack items -->
			<ItemGrid
				gridRows={2}
				gridCols={4}
				items={$characterItems.filter((item) => character.inventory_items_pack.includes(item.id))}
				on:click={() => packItemForm.submitForm()}
				let:item
			>
				<CharacterItemForm
					bind:this={mainBodyItemForm}
					{character}
					characterItem={fvckSvelte(item)}
					dataForm={data}
				/>
			</ItemGrid>
			<span>
				<b>Pack:</b> Takes time to ready. During combat, requires an action to retrieve.
			</span>
		</div>
	{/if}
</section>
