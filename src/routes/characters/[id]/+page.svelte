<script lang="ts">
	import Home from './Home.svelte';
	import Inventory from './Inventory.svelte';
	import Hirelings from './Hirelings.svelte';
	import { Page } from './types';
	import { currentPage } from './stores';
	import { load } from './+page.js';
	import { type Character } from '$lib/database';
	import { page } from '$app/stores';

	export let data: Awaited<ReturnType<typeof load>>;

	const pages = {
		[Page.Home]: Home,
		[Page.Inventory]: Inventory,
		[Page.Hirelings]: Hirelings
	};

	$: pageComponent = pages[$currentPage];

	const character: Character | undefined = undefined;

	const props = {
		character: character as unknown as Character,
		data
	};
</script>

{#if character}
	{#key $currentPage}
		<svelte:component this={pageComponent} {...props} />
	{/key}
{/if}
