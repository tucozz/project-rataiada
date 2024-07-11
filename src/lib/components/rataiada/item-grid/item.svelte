<script lang="ts">
	import { type Item as IItem } from '$lib/database';
	import Icon from '@iconify/svelte';
	import ItemPlaceholderImage from '$lib/images/placeholders/item.png';

	export let item: IItem;

	export let usages: number | undefined;

	const starIconSize = '1.2rem';
</script>

<div
	class:border={item.border}
	class="text-[{item.foregroundColor}] border-[{item.foregroundColor}]
    p-1 flex flex-col justify-between h-full w-full"
>
	<img src={ItemPlaceholderImage} alt="character portrait" class="w-full h-full object-contain" />
	<div class="bg-[{item.backgroundColor}]" />
	<div>
		{#if item.hasStar || item.name}
			<div class:border-b-2={item.divider} class="border-[{item.foregroundColor}] w-full">
				{#if item.hasStar}
					<Icon
						icon="fluent:star-28-filled"
						width={starIconSize}
						height={starIconSize}
						class="mx-1"
					/>
				{/if}
				{#if item.name}
					<b>{item.name}</b>
				{/if}
			</div>
		{/if}
		{#if item.dmgOrDef || usages !== undefined || item.usagesTotal !== undefined}
			<div class="w-full flex justify-between">
				<div class="grid grid-columns-3 gap-[1px]">
					{#each { length: usages ?? 0 } as _}
						<Icon icon="fluent:circle-28-filled" width="1rem" height="1rem" />
					{/each}
					{#each { length: (item.usagesTotal ?? 0) - (usages ?? 0) } as _}
						<Icon icon="fluent:circle-28-regular" width="1rem" height="1rem" />
					{/each}
				</div>
				{#if item.dmgOrDef}
					<div>
						{item.dmgOrDef}
					</div>
				{/if}
			</div>
		{/if}
		{#if item.mechanicDescription}
			<div class="italic">{item.mechanicDescription}</div>
		{/if}
	</div>
	<div>
		{#if item.class}
			<span class="font-bold block">{item.class}</span>
		{/if}
		{#if item.clearDescription}
			<span class="font-bold block">Clear:</span>
			<span>{item.clearDescription}</span>
		{/if}
	</div>
</div>
