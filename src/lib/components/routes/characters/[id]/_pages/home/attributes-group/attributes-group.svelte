<script lang="ts">
	import { Separator } from '$lib/components/ui/separator';
	import { type SuperValidated, type Infer } from 'sveltekit-superforms';
	import { type Character } from '$lib/database';
	import type { _attributeSchema } from './attribute-schema';
	import Attribute from './attribute.svelte';
	import GroupLabels from './group-labels.svelte';

	export let data: SuperValidated<Infer<typeof _attributeSchema>>;
	export let character: Character;
</script>

<div class="flex flex-col">
	<GroupLabels />
	<div class="rounded border mb-8">
		<Attribute
			id="str-1091790"
			label="STR"
			max="stats_strength_max"
			curr="stats_strength_curr"
			{data}
			{character}
		/>
		<Separator />
		<Attribute
			id="dex-1035465"
			label="DEX"
			max="stats_dexterity_max"
			curr="stats_dexterity_curr"
			{data}
			{character}
		/>
		<Separator />
		<Attribute
			id="wil-1100359"
			label="WIL"
			max="stats_willpower_max"
			curr="stats_willpower_curr"
			{data}
			{character}
		/>
	</div>
	<div class="rounded border">
		<Attribute
			id="hp-1060733"
			label="HP"
			max="stats_healthpoints_max"
			curr="stats_healthpoints_curr"
			{data}
			{character}
		/>
	</div>
	<GroupLabels />
</div>
