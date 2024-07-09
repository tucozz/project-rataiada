<script lang="ts">
	import Home from './Home.svelte';
	import Inventory from './Inventory.svelte';
	import Hirelings from './Hirelings.svelte';
	import { Page } from './types';
	import { currentPage } from './stores';

	const pages = {
		[Page.Home]: Home,
		[Page.Inventory]: Inventory,
		[Page.Hirelings]: Hirelings
	};

	$: pageComponent = pages[$currentPage];
</script>

{#key $currentPage}
	<svelte:component this={pageComponent} />
{/key}
