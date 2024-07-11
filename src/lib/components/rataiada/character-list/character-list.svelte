<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { Character } from '$lib/database';

	export let characters: Character[];
</script>

<div>
	<ul>
		{#each characters as character (character.id)}
			<li class="shadow px-2 py-4 my-2">
				<a href="characters/{character.id}">
					<div class="flex">
						<span class="flex-1">{character.identity_name}, level {character.stats_level}</span>

						<div class="w-12 flex justify-center items-center">
							<Icon icon="fluent:open-28-regular" width="1.2rem" height="1.2rem" />
						</div>
					</div>
				</a>
			</li>
		{/each}
	</ul>
</div>
