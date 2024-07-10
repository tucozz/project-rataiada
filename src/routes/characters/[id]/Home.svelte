<script lang="ts">
	import Attribute from '$lib/components/routes/characters/[id]/_pages/home/attribute/attribute.svelte';
import { CharacterIdentity } from '$lib/components/routes/characters/[id]/_pages/home/character-identity';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import type { Character } from '$lib/database';
	import type { load } from './+page';

	export let data: Awaited<ReturnType<typeof load>>;
	export let character: Character;
</script>

<div class="flex flex-col gap-16">
	<CharacterIdentity data={data.identityForm} {character} />

	<!-- TODO: add portrait -->
	<Skeleton class="h-96" />

	<div id="lables">
		<p>attributes</p>
		<p>MAX</p>
		<p>CURRENT</p>
		<p>config</p>
	</div>
	<!-- TODO: add attributes -->
	<Attribute data="STR" {character}/>
	<Attribute data="DEX" {character}/>
	<Attribute data="WIL" {character}/>
	<Attribute data="HP" {character}/>

	<!-- TODO: add grit -->
</div>

<style>
	#lables {
		display: flex;
		justify-content: space-between;
		color: gray;
	}
</style>
