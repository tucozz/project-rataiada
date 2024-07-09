<script lang="ts">
	import { CharacterIdentity } from '$lib/components/routes/characters/[id]/_pages/home/character-identity/index.js';
	import type { Character } from '$lib/database';
	import type { load } from './+page';

	export let data: Awaited<ReturnType<typeof load>>;
	export let character: Character;
</script>

<h1>Home</h1>

<div>
	<CharacterIdentity data={data.identityForm} {character} />
</div>
