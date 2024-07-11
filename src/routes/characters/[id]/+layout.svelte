<script lang="ts">
	import Icon from '@iconify/svelte';
	import { Tooltip } from 'flowbite-svelte';

	const iconsSize = '2rem';

	let isMenuOnFocus = false;
</script>

<header class="my-8">
	<button
		class="inline-block"
		on:touchstart={() => (isMenuOnFocus = true)}
		on:touchend={() => (isMenuOnFocus = false)}
		on:click={() => window.history.back()}
	>
		<Icon
			class="inline-block"
			icon={!isMenuOnFocus ? 'fluent:caret-left-24-regular' : 'fluent:caret-left-24-filled'}
			width={iconsSize}
			height={iconsSize}
		/>
		<span class="text-gray-600 text-sm">Back</span>
		<Tooltip arrow={false}>Leave</Tooltip>
	</button>
</header>

<main>
	<slot />
</main>
