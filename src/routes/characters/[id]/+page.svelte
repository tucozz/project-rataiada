<script lang="ts">
	import Home from './Home.svelte';
	import Inventory from './Inventory.svelte';
	import Hirelings from './Hirelings.svelte';
	import { Page } from './types';
	import { currentPage } from './stores';
	import { load } from './+page.js';
	import { db, type Character } from '$lib/database';
	import { page } from '$app/stores';
	import { liveQuery } from 'dexie';
	import { BottomNav, BottomNavItem, Tooltip } from 'flowbite-svelte';
	import Icon from '@iconify/svelte';

	export let data: Awaited<ReturnType<typeof load>>;

	const pages = {
		[Page.Home]: Home,
		[Page.Inventory]: Inventory,
		[Page.Hirelings]: Hirelings
	};

	$: pageComponent = pages[$currentPage];

	let character = liveQuery(() => db.characters.get($page.params.id));

	$: props = {
		data,
		character: $character as Character
	};

	let lastScrollPosition = 0;
	let showNav = true;
	const navIconSize = '2rem';
</script>

<svelte:window
	on:scroll={() => {
		var currentScrollposition = window.scrollY || document.documentElement.scrollTop; //Get current scroll position

		showNav = currentScrollposition < lastScrollPosition;

		lastScrollPosition = currentScrollposition;
	}}
/>

{#if $character}
	{#key $currentPage}
		<svelte:component this={pageComponent} {...props} />
	{/key}
{/if}

<BottomNav
	id="bottom-nav"
	navType="application"
	classInner="grid-cols-3"
	outerClass="w-11/12 z-50 border-gray-200 dark:bg-gray-700 dark:border-gray-600
		{!showNav && 'transform translate-y-24'} transition-transform duration-1000 ease-in-out"
>
	<BottomNavItem btnName="Home" appBtnPosition="left" on:click={() => currentPage.set(Page.Home)}>
		<Icon
			icon={$currentPage == Page.Home ? 'fluent:home-28-filled' : 'fluent:home-28-regular'}
			width={navIconSize}
			height={navIconSize}
		/>
		<Tooltip arrow={true}>Home</Tooltip>
	</BottomNavItem>
	<BottomNavItem
		btnName="Inventory"
		appBtnPosition="middle"
		on:click={() => currentPage.set(Page.Inventory)}
	>
		<Icon
			icon={$currentPage == Page.Inventory
				? 'fluent:backpack-28-filled'
				: 'fluent:backpack-28-regular'}
			width={navIconSize}
			height={navIconSize}
		/>
		<Tooltip arrow={false}>Inventory</Tooltip>
	</BottomNavItem>
	<BottomNavItem
		btnName="Hirelings"
		appBtnPosition="right"
		on:click={() => currentPage.set(Page.Hirelings)}
	>
		<Icon
			icon={$currentPage == Page.Hirelings
				? 'fluent:book-contacts-28-filled'
				: 'fluent:book-contacts-28-regular'}
			width={navIconSize}
			height={navIconSize}
		/>
		<Tooltip arrow={false}>Hirelings</Tooltip>
	</BottomNavItem>
</BottomNav>
