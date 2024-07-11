<script lang="ts">
	import Icon from '@iconify/svelte';
	import { db, type TextItem } from '$lib/database';

	export let items: TextItem[];

	let timer: ReturnType<typeof setTimeout>;
	const debounce = (itemId: string, content: string) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			db.textItems.update(itemId, { content });
		}, 750);
	};

	const handleRemove = (id: string) => {
		db.textItems.delete(id);
	};
</script>

<ul>
	{#each items as item (item.id)}
		<li class="shadow w-[96%] mx-auto my-2">
			<label>
				<input
					class="border-0"
					type="text"
					on:keyup={(e) => debounce(item.id, e.currentTarget.value)}
					value={item.content}
				/>

				<button
					class="w-12 flex justify-center items-center"
					on:click={() => handleRemove(item.id)}
					aria-label="Remove"
				>
					<Icon icon="fluent:delete-28-regular" width="1.2rem" height="1.2rem" />
				</button>
			</label>
		</li>
	{/each}
</ul>

<style>
	label {
		width: 100%;
		height: 100%;
		display: flex;
	}

	input {
		flex: 1;
	}
</style>
