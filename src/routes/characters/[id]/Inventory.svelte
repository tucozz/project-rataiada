<script lang="ts">
	import { Items } from '$lib/components/routes/characters/[id]/_pages/inventory/items';
	import type { Character } from '$lib/database';
	import type { load } from './+page';
	import { Pips } from '$lib/components/routes/characters/[id]/_pages/inventory/pips';

	export let data: Awaited<ReturnType<typeof load>>;
	export let character: Character;
</script>

<section class="flex flex-col gap-16">
	<h1 class="text-4xl">Inventory</h1>
	
	<Items data={data.characterItemForm} {character} />
	
	<Pips data={data.pipsForm} {character} />
</section>
