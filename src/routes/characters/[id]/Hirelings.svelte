<script lang="ts">
	import type { Character } from '$lib/database';
	import type { load } from './+page';

	export let data: Awaited<ReturnType<typeof load>>;
	export let character: Character;
</script>

<h1 class="text-4xl">Hirelings</h1>
