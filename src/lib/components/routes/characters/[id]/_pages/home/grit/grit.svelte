<script lang="ts">
	import * as Drawer from '$lib/components/ui/drawer';
	import { Button } from '$lib/components/ui/button';
	import { type SuperValidated, type Infer } from 'sveltekit-superforms';
	import { type Character } from '$lib/database';
	import type { _gritSchema } from './grit-schema';
	import GritForm from './grit-form.svelte';

	export let data: SuperValidated<Infer<typeof _gritSchema>>;
	export let character: Character;

	let gritForm: GritForm;
</script>

<Drawer.Root>
	<Drawer.Trigger asChild let:builder>
		<Button builders={[builder]} size="icon" variant="outline" class="border-0 w-full">
			<div class="grid grid-cols-2 w-full h-full">
				<div class="flex items-center justify-center bg-gray-200">
					<span class="block my-auto font-bold text-2xl">grit</span>
				</div>
				<div class="flex items-center justify-center">
					<span class="block my-auto text-xl">{character.stats_gritpoints}</span>
				</div>
			</div>
		</Button>
	</Drawer.Trigger>
	<Drawer.Content class="max-h-[80%]">
		<div class="mx-auto w-full flex flex-col overflow-auto p-4 rounded-t-[10px]">
			<Drawer.Header>
				<Drawer.Title>grit</Drawer.Title>
			</Drawer.Header>
			<div class="p-4 pb-0">
				<GritForm bind:this={gritForm} dataForm={data} {character} />
			</div>
			<Drawer.Footer>
				<Drawer.Close asChild let:builder>
					<Button builders={[builder]} on:click={() => gritForm.submitForm()}>Save</Button>
				</Drawer.Close>
			</Drawer.Footer>
		</div>
	</Drawer.Content>
</Drawer.Root>
