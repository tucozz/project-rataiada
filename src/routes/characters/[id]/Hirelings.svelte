<script lang="ts">
	import type { Character } from '$lib/database';
	import type { load } from './+page';

	export let data: Awaited<ReturnType<typeof load>>;
	export let character: Character;
</script>

<div class="flex flex-col gap-16 h-full">
	<h1 class="text-4xl">Hirelings</h1>

	<div class="flex justify-center items-center h-64">
		<h2 class="text-2xl">Work in progress!</h2>
	</div>
</div>
