<script lang="ts">
	import { page } from '$app/stores';
	import { db } from '$lib/database';
	import { liveQuery } from 'dexie';
	import { ItemBoard } from '$lib/components/rataiada/item-board';
	import type { load } from './+page';
	import { Pips } from '$lib/components/routes/characters/[id]/_pages/inventory/bank/pips';

	let character = liveQuery(() => db.characters.get($page.params.id));

	let bankItems = liveQuery(() =>
		db.textItems
			.where('character_id')
			.equals($page.params.id)
			.and((item) => item.place === 'bank')
			.toArray()
	);

	export let data: Awaited<ReturnType<typeof load>>;
</script>

{#if $character && $bankItems}
	<div class="flex flex-col gap-16">
		<h1 class="text-4xl">Bank</h1>

		<Pips data={data.pipsForm} character={$character} />

		<ItemBoard character={$character} items={$bankItems} place="bank" />
	</div>
{/if}
