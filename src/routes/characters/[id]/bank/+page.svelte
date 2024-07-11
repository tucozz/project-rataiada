<script lang="ts">
	import { page } from '$app/stores';
	import { db } from '$lib/database';
	import { liveQuery } from 'dexie';
	import { ItemBoard } from '$lib/components/rataiada/item-board';

	let character = liveQuery(() => db.characters.get($page.params.id));

	let bankItems = liveQuery(() =>
		db.textItems
			.where('character_id')
			.equals($page.params.id)
			.and((item) => item.place === 'bank')
			.toArray()
	);
</script>

{#if $character && $bankItems}
	<div class="flex flex-col gap-16">
		<h1 class="text-4xl">Bank</h1>

		<ItemBoard character={$character} items={$bankItems} place="bank" />
	</div>
{/if}
