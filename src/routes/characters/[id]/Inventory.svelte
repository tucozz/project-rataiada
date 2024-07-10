<script lang="ts">
	import type { Character } from '$lib/database';
	import type { load } from './+page';
	import { Pips } from '$lib/components/routes/characters/[id]/_pages/inventory/pips';

	export let data: Awaited<ReturnType<typeof load>>;
	export let character: Character;
</script>

<h1 class="text-4xl">Inventory</h1>

<Pips data={data.pipsForm} {character} />
