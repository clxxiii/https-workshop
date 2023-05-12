<script lang="ts">
	import { script } from '$lib/script';
	import { cubicInOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';

	export let sim: App.Sim;

	let maxlength = 86; // RSA max length
	let visible = false;
	let hintVisible = false;
	let value: string;

	const showHint = () => (hintVisible = true);

	export const show = () => {
		visible = true;
		setTimeout(showHint, 5000); // show hint after 5 seconds
	};
	export const hide = () => {
		visible = false;
		hintVisible = false;
	};
	export const getValue = () => value;

	const submit = (e: KeyboardEvent) => {
		if (e.code != 'Enter') return;

		script(sim);
		hide();
	};
</script>

{#if visible}
	<div transition:fade={{ duration: 500, easing: cubicInOut }} class="overlay">
		<div class="box">
			<span class="title">Enter a password to be used as a key:</span>
			<input type="text" bind:value {maxlength} on:keydown={submit} />

			{#if hintVisible}
				<span transition:fade={{ duration: 1000 }} class="hint"
					>Click above the line, type a password, and then hit enter</span
				>
			{/if}
		</div>
	</div>
{/if}

<style>
	.overlay {
		position: fixed;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #0004;
		backdrop-filter: blur(5px);
		z-index: 15;
	}
	.box {
		position: relative;
		width: 265px;
		height: 300px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.title {
		font-size: 2em;
		font-family: 'Mohave';
		text-transform: uppercase;
	}
	input {
		background: none;
		outline: none;
		border: 0;
		border-bottom: 3px solid #aaaaaa;
		font-size: 2em;
		color: white;
		width: 265px;
		text-align: center;
		font-family: 'Lexend';
	}
	input:focus {
		border-bottom: 3px solid #fff;
	}
</style>
