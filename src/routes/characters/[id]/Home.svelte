<script lang="ts">
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

	<!-- TODO: add attributes -->

	<!-- TODO: add grit -->
</div>
