<script lang="ts">
	import VerticalCounter from '$lib/components/ui/vertical-counter/vertical-counter.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';

	export let valueCurr: number;
	export let valueMax: number;
</script>

<div class="flex items-center justify-center space-x-2">
	<VerticalCounter bind:value={valueCurr} />
	<Separator orientation="vertical" />
	<VerticalCounter bind:value={valueMax} />
</div>
