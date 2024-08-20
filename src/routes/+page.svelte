<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Drawer from '$lib/components/ui/drawer';
	import Icon from '@iconify/svelte';
	import { base } from '$app/paths';
	import { goto } from '$app/navigation';
	import { type SuperValidated, type Infer } from 'sveltekit-superforms';
	import { _characterSchema } from './+page.js';
	import { liveQuery } from 'dexie';
	import { db } from '$lib/database';

	import NewCharacterForm from './new-character-form.svelte';
	import CharacterList from '$lib/components/rataiada/character-list/character-list.svelte';

	export let data: SuperValidated<Infer<typeof _characterSchema>>;

	let newCharacterForm: NewCharacterForm;

	const handleSubmited = (e: CustomEvent<{ characterId: string }>) => {
		goto(`${base}/characters/${e.detail.characterId}`);
	};

	let characters = liveQuery(() => db.characters.toArray());

	const iconSize = '2rem';
</script>

<svelte:head>
	<title>Rataiada</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1 class="text-4xl my-4">Characters</h1>

	{#if $characters && $characters.length > 0}
		<CharacterList characters={$characters} />
	{:else}
		<p class="text-xl text-gray-500 text-center mx-auto my-16">no characters yet...</p>
	{/if}

	<Drawer.Root>
		<Drawer.Trigger asChild let:builder>
			<Button builders={[builder]} size="icon" class="fixed right-0 bottom-0 m-8 size-12">
				<Icon icon="fluent:add-28-regular" width={iconSize} height={iconSize} />
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
