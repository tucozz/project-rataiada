<script lang="ts">
	import AttributesGroup from '$lib/components/routes/characters/[id]/_pages/home/attributes-group/attributes-group.svelte';
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

	<AttributesGroup data={data.attributeForm} {character} />

	<!-- TODO: add grit -->
</div>
