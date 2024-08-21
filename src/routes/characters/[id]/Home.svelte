<script lang="ts">
	import AttributesGroup from '$lib/components/routes/characters/[id]/_pages/home/attributes-group/attributes-group.svelte';
	import { CharacterIdentity } from '$lib/components/routes/characters/[id]/_pages/home/character-identity';
	import { Grit } from '$lib/components/routes/characters/[id]/_pages/home/grit';
	import { XP } from '$lib/components/routes/characters/[id]/_pages/home/xp';
	import type { Character } from '$lib/database';
	import type { load } from './+page';
	import { CharacterPortrait } from '$lib/components/routes/characters/[id]/_pages/home/character-portrait';

	export let data: Awaited<ReturnType<typeof load>>;
	export let character: Character;
</script>

<div class="flex flex-col gap-16">
	<CharacterIdentity data={data.identityForm} {character} />

	<CharacterPortrait {character} />

	<AttributesGroup data={data.attributeForm} {character} />

	<XP data={data.xpForm} {character} />

	<Grit data={data.gritForm} {character} />
</div>
