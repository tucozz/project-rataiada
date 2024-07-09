<script lang="ts">
	import VerticalCounter from '$lib/components/ui/vertical-counter/vertical-counter.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import * as Form from '$lib/components/ui/form';
	import type { SuperForm, Infer, FormPath } from 'sveltekit-superforms';
	import { _characterSchema } from '../../../routes/+page.js';

	export let form: SuperForm<Infer<typeof _characterSchema>>;

	export let maxName: FormPath<Infer<typeof _characterSchema>>;
	export let maxValue: number;

	export let currName: FormPath<Infer<typeof _characterSchema>>;
	export let currValue: number;
</script>

<div class="flex items-center justify-center space-x-8">
	<Form.Field {form} name={maxName}>
		<Form.Control let:attrs>
			<Form.Label>Max</Form.Label>
			<VerticalCounter {...attrs} bind:value={maxValue} placeholder="0" />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Separator orientation="vertical" class="h-32" />
	<Form.Field {form} name={currName}>
		<Form.Control let:attrs>
			<Form.Label>Current</Form.Label>
			<VerticalCounter {...attrs} bind:value={currValue} placeholder="0" />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
</div>
