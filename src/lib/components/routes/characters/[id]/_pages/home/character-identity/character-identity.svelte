<script lang="ts">
	import { Separator } from '$lib/components/ui/separator/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import Icon from '@iconify/svelte';
	import { type SuperValidated, type Infer } from 'sveltekit-superforms';
	import { _identitySchema } from './identity-schema.js';
	import { type Character } from '$lib/database/index.js';
	import EditIdentityForm from './edit-identity-form.svelte';

	export let data: SuperValidated<Infer<typeof _identitySchema>>;
	export let character: Character;

	let editIdentityForm: EditIdentityForm;
</script>

<div>
	<div>
		<h2>Name</h2>
		<Separator />
		<p>Background</p>
	</div>
	<Drawer.Root>
		<Drawer.Trigger asChild let:builder>
			<Button builders={[builder]} size="icon">
				<Icon icon="fluent:more-horizontal-28-regular" width="1.2rem" height="1.2rem" />
			</Button>
		</Drawer.Trigger>
		<Drawer.Content class="max-h-[64%]">
			<div class="mx-auto w-full flex flex-col overflow-auto p-4 rounded-t-[10px]">
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
