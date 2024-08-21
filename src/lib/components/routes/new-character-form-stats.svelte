<script lang="ts">
	import { Counter } from '$lib/components/ui/counter';
	import * as Form from '$lib/components/ui/form';
	import type { SuperForm, Infer, FormPath } from 'sveltekit-superforms';
	import { _characterSchema } from '../../../routes/+page.js';

	export let form: SuperForm<Infer<typeof _characterSchema>>;

	export let name: FormPath<Infer<typeof _characterSchema>>;
	export let value: number;
</script>

<div class="flex items-center justify-center space-x-8">
	<Form.Field {form} {name}>
		<Form.Control let:attrs>
			<Counter {...attrs} bind:value placeholder="0" direction="horizontal" />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
</div>
