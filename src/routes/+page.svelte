<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import Icon from '@iconify/svelte';
	import { base } from '$app/paths';
	import { goto } from '$app/navigation';
	import { type SuperValidated, type Infer } from 'sveltekit-superforms';
	import { _characterSchema } from './+page.js';

	import NewCharacterForm from './new-character-form.svelte';

	export let data: SuperValidated<Infer<typeof _characterSchema>>;

	let newCharacterForm: NewCharacterForm;

	const handleSubmited = (e: CustomEvent<{ characterId: string; }>) => {
		goto(`${base}/characters/${e.detail.characterId}`);
	};
</script>

<svelte:head>
	<title>Rataiada</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1 class="text-4xl text-center">Welcome</h1>

	<a href="characters/Home">Characters</a>
</section>
