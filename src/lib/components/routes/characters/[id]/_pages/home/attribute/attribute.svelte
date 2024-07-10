<script>
	import Drawer from "$lib/components/ui/drawer/drawer.svelte";
	import Icon from "@iconify/svelte";
	import { Button } from "bits-ui";
	import EditIdentityForm from "../character-identity/edit-identity-form.svelte";

	export let data;
	export let character;
</script>

<div id="attribute" class="border rounded-md p-2 flex justify-between">
	<div>
		<!-- label for each of the attributes -->
		<h1>{data}</h1>
	</div>
	<div>
		<!-- MAX value for attribute-->
		{#if data === "STR"}
			<p>{character.stats_strength_max}</p>
		{:else if data === "DEX"}
			<p>{character.stats_dexterity_max}</p>
		{:else if data === "WIL"}
			<p>{character.stats_willpower_max}</p>
		{:else if data === "HP"}
			<p>{character.stats_healthpoints_max}</p>
		{/if}


	</div>
	<div>
		<!-- Current value for attribute -->
		{#if data === "STR"}
			<p>{character.stats_strength_curr}</p>
		{:else if data === "DEX"}
			<p>{character.stats_dexterity_curr}</p>
		{:else if data === "WIL"}
			<p>{character.stats_willpower_curr}</p>
		{:else if data === "HP"}
			<p>{character.stats_healthpoints_curr}</p>
		{/if}
	</div>
	<div>
		<!-- drawer to change attribute -->
		<!-- 
		
		<Drawer.Root>
			<Drawer.Trigger asChild let:builder>
				<Button builders={[builder]} size="icon" variant="outline" class="border-0">
					<Icon icon="fluent:more-horizontal-28-filled" width={iconSize} height={iconSize} />
				</Button>
			</Drawer.Trigger>
			<Drawer.Content class="max-h-[80%]">
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
		-->
	</div>
</div>

<style>
	#attribute {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	h1 {
		font-size: 1.5rem;
	}
</style>