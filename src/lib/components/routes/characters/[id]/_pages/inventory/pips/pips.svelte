<script lang="ts">
	import * as Drawer from '$lib/components/ui/drawer';
	import { Button } from '$lib/components/ui/button';
	import { type SuperValidated, type Infer } from 'sveltekit-superforms';
	import { type Character } from '$lib/database';
	import type { _pipsSchema } from './pips-schema';
	import PipsForm from './pips-form.svelte';

	export let data: SuperValidated<Infer<typeof _pipsSchema>>;
	export let character: Character;

	let pipsForm: PipsForm;
</script>

<Drawer.Root>
	<Drawer.Trigger asChild let:builder>
		<Button builders={[builder]} size="icon" variant="outline" class="border-0 w-full">
			<div class="grid grid-cols-3 w-full h-full rounded border">
				<div class="flex items-center justify-center bg-gray-200">
					<span class="block my-auto font-bold text-2xl">pips</span>
				</div>
				<div class="flex items-center justify-center gap-4 col-span-2">
					<span class="text-xl">{character.inventory_pips}</span>
					<span class="text-xl">/</span>
					<span class="text-xl">250</span>
				</div>
			</div>
		</Button>
	</Drawer.Trigger>
	<Drawer.Content class="max-h-[80%]">
		<div class="mx-auto w-full flex flex-col overflow-auto p-4 rounded-t-[10px]">
			<Drawer.Header>
				<Drawer.Title>pips</Drawer.Title>
			</Drawer.Header>
			<div class="p-4 pb-0">
				<PipsForm bind:this={pipsForm} dataForm={data} {character} />
			</div>
			<Drawer.Footer>
				<Drawer.Close asChild let:builder>
					<Button builders={[builder]} on:click={() => pipsForm.submitForm()}>Save</Button>
				</Drawer.Close>
			</Drawer.Footer>
		</div>
	</Drawer.Content>
</Drawer.Root>
