<script lang="ts">
	import type { Character } from '$lib/database';
	import type { load } from './+page';
	import { Pips } from '$lib/components/routes/characters/[id]/_pages/inventory/pips';
	import { Items } from '$lib/components/routes/characters/[id]/_pages/inventory/items';
	import Icon from '@iconify/svelte';

	export let data: Awaited<ReturnType<typeof load>>;
	export let character: Character;
</script>

<div class="flex flex-col gap-16">
	<h1 class="text-4xl">Inventory</h1>

	<Items {character} />

	<Pips data={data.pipsForm} {character} />

	<a
		href="{character.id}/bank"
		class="bg-primary text-secondary text-2xl rounded border p-4 grid grid-cols-3"
	>
		<div class="flex justify-center items-center">
			<Icon icon="fluent:building-bank-28-regular" width="1.7rem" height="1.7rem" />
		</div>
		<span class="col-span-2"> Bank </span>
	</a>
</div>
