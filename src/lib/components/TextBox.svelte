<script lang="ts">
	import { script } from '$lib/script';
	import { scriptStage } from '$lib/stores';

	export let width = 30;
	export let height = 6;
	export let side: 'left' | 'right' = 'left';
	export let disabled = false;
	export let hint = '';
	export let sim: App.Sim;
	let opposite = side == 'left' ? 'right' : 'left';

	let value: string;
	let box: HTMLTextAreaElement;
	let sendVisible = true;

	const clicked = () => {
		script($scriptStage, sim);
	};

	export const getValue = () => {
		return value;
	};

	export const getBox = () => {
		return box;
	};

	export const setSendVisible = (b: boolean) => {
		sendVisible = b;
	};
</script>

<div class="textbox">
	<textarea
		style="border-bottom-{side}-radius: 0px; margin-{opposite}: 50px"
		cols={width}
		placeholder={hint}
		bind:value
		bind:this={box}
		{disabled}
		rows={height}
	/>

	{#if value?.length >= 1 && sendVisible}
		<button on:click={clicked}>Send</button>
	{/if}
</div>

<style>
	.textbox {
		position: relative;
		height: 176px;
		padding: 0;
		margin: 0;
	}
	button {
		position: absolute;
		bottom: 3px;
		left: 3px;
		height: 30px;
		font-family: 'Lexend', sans-serif;
		font-size: 1.25em;
		color: var(--text);
		background: var(--text2);
		border: none;
		right: 53px;
		border-bottom-right-radius: 16px;
	}
	button:hover {
		background: var(--text3);
	}
	textarea {
		margin: 0;
		outline: none;
		padding: 10px;
		color: var(--text);
		font-family: 'Lexend', sans-serif;
		font-size: 1.25em;
		background: var(--background);
		border: solid 3px var(--text2);
		border-radius: 20px;
		resize: none;
		transition: background 0.2s ease;
	}
	textarea:disabled {
		opacity: 0.6;
	}
</style>
