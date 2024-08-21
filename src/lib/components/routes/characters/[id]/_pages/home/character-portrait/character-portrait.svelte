<script lang="ts">
	import { AspectRatio } from '$lib/components/ui/aspect-ratio';
	import type { Character } from '$lib/database';
	import { press } from 'svelte-gestures';
	import CharacterPortraitPlaceholder from '$lib/images/placeholders/character-portrait.png';
	import * as Drawer from '$lib/components/ui/drawer';
	import { Input } from '$lib/components/ui/input';
	import { db } from '$lib/database';
	import { Button } from '$lib/components/ui/button';

	export let character: Character;

	let open = false;

	const handler = () => {
		console.log('handler');
		open = true;
	};

	const changeHandler = async (event: Event) => {
		const files = (event.target as HTMLInputElement).files;
		if (files === null) {
			console.error('No files selected');
			return;
		}

		const file = files[0];
		const reader = new FileReader();
		reader.onload = async (event) => {
			const portraitBlob = (event.target as FileReader).result;
			if (portraitBlob === null || typeof portraitBlob === 'string') {
				console.error('Error reading portrait file');
				return;
			}

			const portraitBase64 = btoa(
				new Uint8Array(portraitBlob as ArrayBuffer).reduce(
					(data, byte) => data + String.fromCharCode(byte),
					''
				)
			);

			await db.characters.update(character.id, { identity_portrait: portraitBase64 });

			open = false;
		};

		reader.readAsArrayBuffer(file);
	};
</script>

<div use:press={{ timeframe: 300, triggerBeforeFinished: true }} on:press={handler}>
	<AspectRatio ratio={4 / 5} class="rounded-md">
		<img
			src={character.identity_portrait === null
				? CharacterPortraitPlaceholder
				: 'data:image/png;base64,' + character.identity_portrait}
			alt="character portrait"
			class="h-full w-full object-cover {character.identity_portrait === null
				? 'border-2 border-dashed rounded-md'
				: ''}"
		/>
	</AspectRatio>
	<Drawer.Root bind:open>
		<Drawer.Content>
			<Drawer.Header>
				<Drawer.Title>Character Portrait</Drawer.Title>
			</Drawer.Header>
			<div class="p-8 w-full">
				<div class="flex justify-center items-center w-16 h-16 mx-auto mb-8 rounded-md">
					<Input type="file" accept="image/*" on:change={changeHandler} />
				</div>
				<Button
					variant="destructive"
					class="w-full"
					on:click={() => {
						db.characters.update(character.id, { identity_portrait: null });
						open = false;
					}}
				>
					Remove
				</Button>
			</div>
		</Drawer.Content>
	</Drawer.Root>
</div>
