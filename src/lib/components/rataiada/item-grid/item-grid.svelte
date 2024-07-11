<script lang="ts">
	import { type CharacterItem, type Item } from '$lib/database';
	import ItemDrawer from './item-drawer.svelte';

	export let gridCols: number;
	export let gridRows: number;
	export let items: ArrayLike<Item & Partial<CharacterItem>>;

	$: remainingItems = gridRows * gridCols;
</script>

<div class="grid grid-cols-{gridCols} grid-rows-{gridRows}">
	{#each items as item (item.id)}
		{@const position =
			item.gridPositionTop !== undefined && item.gridPositionLeft !== undefined
				? { top: item.gridPositionTop, left: item.gridPositionLeft }
				: undefined}

		<div
			class="{position
				? `row-start-${position.top}  col-start-${position.left}`
				: ''} row-span-{item.height} col-span-{item.width}"
		>
			<ItemDrawer on:click usages={item.usages} {item}>
				<slot {item} />
			</ItemDrawer>
		</div>
	{/each}
	{#each { length: remainingItems } as _}
		<div class="pb-[100%]" />
	{/each}
</div>
