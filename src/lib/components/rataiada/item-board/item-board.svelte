<script lang="ts">
	import Icon from '@iconify/svelte';
	import { db, type Character, type TextItem } from '$lib/database';
	import ItemList from './item-list.svelte';

	export let character: Character;
	export let items: TextItem[];
	export let place: 'inventory_main_body' | 'inventory_pack' | 'bank' | 'grit';

	let newItemContent: string;

	const handleAdd = () => {
		if (newItemContent) {
			db.textItems.add({
				id: crypto.randomUUID().toString(),
				character_id: character.id,
				content: newItemContent,
				place
			});

			newItemContent = '';
		}
	};
</script>

<div class="board border rounded border-dashed border-b-0 pb-16">
	<div class="flex justify-between border rounded mb-2">
		<input class="w-full" placeholder="add new item..." bind:value={newItemContent} />
		<div class="w-16 flex justify-center items-center">
			<button
				class="size-8 flex justify-center items-center bg-primary rounded"
				on:click={handleAdd}
			>
				<Icon
					class="text-secondary"
					icon="fluent:arrow-down-28-regular"
					width="1.5rem"
					height="1.5rem"
				/>
			</button>
		</div>
	</div>

	<div>
		{#if items.length > 0}
			<ItemList {items} />
		{:else}
			<p class="text-center mt-2 mb-4">No items yet.</p>
		{/if}
	</div>
</div>

<style>
	.board {
		margin: 0 auto;
	}

	.board > div > input {
		font-size: 1.4em;
		grid-column: 1/3;
		padding: 0.5em;
	}
</style>
