<script lang="ts">
	import { liveQuery } from 'dexie';
	import { ItemBoard } from '$lib/components/rataiada/item-board';
	import { db, type Character } from '$lib/database';
	import { Separator } from '$lib/components/ui/separator';

	export let character: Character;

	let items = liveQuery(() => db.textItems.where('character_id').equals(character.id).toArray());
</script>

<section>
	{#if $items}
		<div>
			<ItemBoard
				{character}
				items={$items.filter((item) => item.place == 'inventory_main_body')}
				place="inventory_main_body"
			/>
			<div class="grid grid-cols-2 mt-4">
				<span>
					<b>Carrided:</b> Ready to use.
				</span>
				<span>
					<b>Worn:</b> Quick to ready.
				</span>
			</div>
		</div>
		<Separator class="my-2" />
		<div>
			<ItemBoard
				{character}
				items={$items.filter((item) => item.place == 'inventory_pack')}
				place="inventory_pack"
			/>
			<div class="mt-4">
				<span>
					<b>Pack:</b> Takes time to ready. During combat, requires an action to retrieve.
				</span>
			</div>
		</div>
	{/if}
</section>
