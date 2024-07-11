<script lang="ts">
	import { Separator } from '$lib/components/ui/separator';
	import { Button } from '$lib/components/ui/button';
	import * as Drawer from '$lib/components/ui/drawer';
	import Icon from '@iconify/svelte';
	import { type SuperValidated, type Infer } from 'sveltekit-superforms';
	import { _identitySchema } from './identity-schema.js';
	import { db, type Character } from '$lib/database';
	import EditIdentityForm from './edit-identity-form.svelte';
	import { goto } from '$app/navigation';
	import { Dialog } from 'bits-ui';

	export let data: SuperValidated<Infer<typeof _identitySchema>>;
	export let character: Character;

	let editIdentityForm: EditIdentityForm;

	const iconSize = '1.7rem';


	function handleRemove(id: string): any {
		db.characters.delete(id);
		goto('/');
	}
</script>

<div class="border rounded-md p-2 flex justify-between">
	<div>
		
		<h1 class="text-4xl">{character.identity_name}</h1>
		<Separator class="m-1 w-48" />
		<p class="text-sm text-gray-600">{character.identity_background}</p>
	</div>
	<Drawer.Root>
		<Drawer.Trigger asChild let:builder>
			<Button builders={[builder]} size="icon" variant="outline" class="border-0">
				<Icon icon="fluent:more-horizontal-28-filled" width={iconSize} height={iconSize} />
			</Button>
		</Drawer.Trigger>
		<Drawer.Content class="max-h-[80%]">
			<div class="mx-auto w-full flex flex-col overflow-auto p-4 rounded-t-[10px]">
				<button	class="w-12 flex justify-center items-center"
					on:click={() => handleRemove(character.id)}
					aria-label="Remove">
					<Icon icon="fluent:delete-28-regular" width="1.2rem" height="1.2rem" />
				</button>
				<Drawer.Header>
					<Drawer.Title>Character Identity</Drawer.Title>
				</Drawer.Header>
				<div class="p-4 pb-0">
					<EditIdentityForm bind:this={editIdentityForm} dataForm={data} {character} />
				</div>
				<Drawer.Footer>
					<Drawer.Close asChild let:builder>
						<Button builders={[builder]} on:click={() => editIdentityForm.submitForm()}>Save</Button
						>
					</Drawer.Close>
				</Drawer.Footer>
			</div>
		</Drawer.Content>
	</Drawer.Root>
</div>
