<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import Icon from '@iconify/svelte';
	import { base } from '$app/paths';
	import { goto } from '$app/navigation';
	import { type SuperValidated, type Infer } from 'sveltekit-superforms';
	import { _characterSchema } from './+page.js';
	import { liveQuery } from 'dexie';
	import { db } from '$lib/database/index.js';

	import NewCharacterForm from './new-character-form.svelte';

	export let data: SuperValidated<Infer<typeof _characterSchema>>;

	let newCharacterForm: NewCharacterForm;

	const handleSubmited = (e: CustomEvent<{ characterId: string }>) => {
		goto(`${base}/characters/${e.detail.characterId}`);
	};

	let characters = liveQuery(() => db.characters.toArray());
</script>

<svelte:head>
	<title>Rataiada</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1 class="text-4xl my-4">Characters</h1>

	<div>
		<ul>
			{#if $characters}
				{#each $characters as character (character.id)}
					<li>
						<a href="characters/{character.id}">
							{character.identity_name}, {character.stats_level}
						</a>
					</li>
				{/each}
			{/if}
		</ul>
	</div>

	<Drawer.Root>
		<Drawer.Trigger asChild let:builder>
			<Button builders={[builder]} size="icon" class="fixed right-0 bottom-0 m-8">
				<Icon icon="fluent:add-28-regular" width="1.2rem" height="1.2rem" />
			</Button>
		</Drawer.Trigger>
		<Drawer.Content class="max-h-[96%]">
			<div class="mx-auto w-full flex flex-col overflow-auto p-4 rounded-t-[10px]">
				<Drawer.Header>
					<Drawer.Title>Create a new character</Drawer.Title>
				</Drawer.Header>
				<div class="p-4 pb-0">
					<NewCharacterForm
						bind:this={newCharacterForm}
						dataForm={data}
						on:submited={handleSubmited}
					/>
				</div>
				<Drawer.Footer>
					<Button on:click={() => newCharacterForm.submitForm()}>Submit</Button>
					<Drawer.Close asChild let:builder>
						<Button builders={[builder]} variant="destructive">Discart</Button>
					</Drawer.Close>
				</Drawer.Footer>
			</div>
		</Drawer.Content>
	</Drawer.Root>
</section>
