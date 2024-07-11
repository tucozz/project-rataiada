<script lang="ts">
	import type { Character } from '$lib/database';
	import type { load } from './+page';
	import { Pips } from '$lib/components/routes/characters/[id]/_pages/inventory/pips';
	import { Items } from '$lib/components/routes/characters/[id]/_pages/inventory/items';

	export let data: Awaited<ReturnType<typeof load>>;
	export let character: Character;


</script>

<div class="flex flex-col gap-16">
	<h1 class="text-4xl">Inventory</h1>
	
	<Items {character} />
	
	<Pips data={data.pipsForm} {character} />
</div>
