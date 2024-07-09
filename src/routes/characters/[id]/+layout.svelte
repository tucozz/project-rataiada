<script lang="ts">
	import { base } from '$app/paths';
	import Icon from '@iconify/svelte';
	import { currentPage } from './stores';
	import { Page } from './types';

	import { BottomNav, BottomNavItem, Tooltip } from 'flowbite-svelte';

	const iconsSize = '2rem';

	let isMenuOnFocus = false;

	let lastScrollPosition = 0;
	let showNav = true;
</script>

<svelte:window
	on:scroll={() => {
		var currentScrollposition = window.scrollY || document.documentElement.scrollTop; //Get current scroll position

		showNav = currentScrollposition < lastScrollPosition;

		lastScrollPosition = currentScrollposition;
	}}
/>

<header class="my-8">
	<a
		href="{base}/"
		class="inline-block"
		on:touchstart={() => (isMenuOnFocus = true)}
		on:touchend={() => (isMenuOnFocus = false)}
	>
		<Icon
			class="inline-block"
			icon={!isMenuOnFocus
				? 'fluent:caret-left-24-regular'
				: 'fluent:caret-left-24-filled'}
			width={iconsSize}
			height={iconsSize}
		/>
		<span class="text-gray-600 text-sm">Back</span>
		<Tooltip arrow={false}>Leave</Tooltip>
	</a>
</header>

<main>
	<slot />
</main>

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
			width={iconsSize}
			height={iconsSize}
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
			width={iconsSize}
			height={iconsSize}
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
			width={iconsSize}
			height={iconsSize}
		/>
		<Tooltip arrow={false}>Hirelings</Tooltip>
	</BottomNavItem>
</BottomNav>
