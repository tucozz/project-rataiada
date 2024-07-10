<script lang="ts">
	import * as Drawer from '$lib/components/ui/drawer';
	import { Button } from '$lib/components/ui/button';
	import { type SuperValidated, type Infer } from 'sveltekit-superforms';
	import { type Character } from '$lib/database';
	import type { _attributeSchema } from './attribute-schema';
	import AttributeForm from './attribute-form.svelte';
	import type { OnlyType } from './types';

	export let data: SuperValidated<Infer<typeof _attributeSchema>>;
	export let character: Character;

	export let id: string;
	export let label: string;
	export let max: keyof OnlyType<Character, number>;
	export let curr: keyof OnlyType<Character, number>;

	let attributeForm: AttributeForm;
</script>

<Drawer.Root>
	<Drawer.Trigger asChild let:builder>
		<Button builders={[builder]} size="icon" variant="outline" class="border-0 w-full">
			<div class="grid grid-cols-3 w-full h-full">
				<div class="flex items-center justify-center bg-gray-200">
					<span class="block my-auto font-bold text-2xl">{label}</span>
				</div>
				<div class="flex items-center justify-center border-r-2">
					<span class="block my-auto text-xl">{character[max]}</span>
				</div>
				<div class="flex items-center justify-center">
					<span class="block my-auto text-xl">{character[curr]}</span>
				</div>
			</div>
		</Button>
	</Drawer.Trigger>
	<Drawer.Content class="max-h-[80%]">
		<div class="mx-auto w-full flex flex-col overflow-auto p-4 rounded-t-[10px]">
			<Drawer.Header>
				<Drawer.Title>{label}</Drawer.Title>
			</Drawer.Header>
			<div class="p-4 pb-0">
				<AttributeForm bind:this={attributeForm} {id} {max} {curr} dataForm={data} {character} />
			</div>
			<Drawer.Footer>
				<Drawer.Close asChild let:builder>
					<Button builders={[builder]} on:click={() => attributeForm.submitForm()}>Save</Button>
				</Drawer.Close>
			</Drawer.Footer>
		</div>
	</Drawer.Content>
</Drawer.Root>
