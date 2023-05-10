<script lang="ts">
	import { onMount } from 'svelte';
	import Line from './Line.svelte';
	import TextBox from './TextBox.svelte';
	import User from './User.svelte';
	import Narration from './Narration.svelte';

	// variables
	let line: Line;
	let userATextbox: TextBox;
	let userBTextbox: TextBox;
	let narration: Narration;

	let sim: App.Sim;
	onMount(() => {
		sim = {
			line,
			userATextbox,
			userBTextbox,
			narration
		};
	});
</script>

<div class="user a">
	<div class="label">
		<User name="Alice" />
	</div>
	<TextBox {sim} bind:this={userATextbox} side="left" hint="Click here to send a message to Bob" />
</div>
<Line bind:this={line} />
<div class="user b">
	<TextBox {sim} bind:this={userBTextbox} side="right" disabled />
	<div class="label">
		<User name="Bob" />
	</div>
</div>
<Narration bind:this={narration} />


<style>
	.user {
		display: flex;
		align-items: flex-end;
	}

	.label {
		transform: translateY(50px);
	}
</style>
