<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import Icon from '@iconify/svelte';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { fly } from 'svelte/transition';

	type $$Props = HTMLInputAttributes;

	export let value: $$Props['value'] = undefined;

	const transitionDistance = 16;
	let transitionDirection: 1 | -1 = 1;

	const iconSize = '1.2rem';

	const handleClick = (amount: number) => {
		transitionDirection = amount > 0 ? 1 : -1;
		value += amount;
	};
</script>

<div class="flex flex-col items-center justify-center space-x-2">
	<Button
		variant="outline"
		size="icon"
		class="h-8 w-8 shrink-0 rounded-full"
		on:click={() => handleClick(1)}
	>
		<Icon icon="fluent:add-28-filled" width={iconSize} height={iconSize} />
		<span class="sr-only">Increase</span>
	</Button>
	<div class="relative h-12 min-w-8">
		{#key value}
			<div
				class="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-12 text-center"
				in:fly={{ duration: 300, y: -transitionDistance * transitionDirection }}
				out:fly={{ duration: 300, y: transitionDistance * transitionDirection }}
			>
				{value}
			</div>
		{/key}
		<Input
			class="hidden"
			readonly
			type="number"
			bind:value
			on:blur
			on:change
			on:click
			on:focus
			on:focusin
			on:focusout
			on:keydown
			on:keypress
			on:keyup
			on:mouseover
			on:mouseenter
			on:mouseleave
			on:mousemove
			on:paste
			on:input
			{...$$restProps}
		/>
	</div>
	<Button
		variant="outline"
		size="icon"
		class="h-8 w-8 shrink-0 rounded-full"
		on:click={() => handleClick(-1)}
		disabled={value <= 0}
	>
		<Icon icon="fluent:line-horizontal-1-28-filled" width={iconSize} height={iconSize} />
		<span class="sr-only">Decrease</span>
	</Button>
</div>
