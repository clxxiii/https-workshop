<script lang="ts">
	import { script } from '$lib/script';
	import { infoStage, scriptStage } from '$lib/stores';
	import { blur } from 'svelte/transition';

	type Suggestion = {
		name: string;
		text: string;
		state?: number;
		info?: number;
	};

	export let width = 30;
	export let height = 6;
	export let side: 'left' | 'right' = 'left';
	export let disabled = false;
	export let readonly = false;
	export let hint = '';
	export let sim: App.Sim;
	export let name: string;
	let opposite = side == 'left' ? 'right' : 'left';

	let value: string;
	let box: HTMLTextAreaElement;
	let boxVisible = true;
	let sendVisible = true;
	let suggestions: Suggestion[] = [];

	const clicked = () => {
		script(sim, name);
	};

	export const setDisabled = (b: boolean) => (disabled = b);
	export const setReadOnly = (b: boolean) => (readonly = b);

	export const getValue = (): string => {
		return value;
	};

	export const getBox = (): HTMLTextAreaElement => {
		return box;
	};

	export const setValue = (s: string) => (value = s);
	export const setPlaceholder = (s: string) => (hint = s);

	export const setSendVisible = (b: boolean) => {
		sendVisible = b;
	};

	export const setSuggestions = (...s: Suggestion[]) => {
		disabled = true;
		suggestions = s;
	};

	export const fadeToValue = async (s: string) => {
		boxVisible = false;
		await new Promise((resolve) => setTimeout(resolve, 500));
		value = s;
		boxVisible = true;
		await new Promise((resolve) => setTimeout(resolve, 500));
	};

	const suggestionSelected = (s: Suggestion) => {
		readonly = true;
		disabled = false;
		value = s.text;
		suggestions = [];
		setSendVisible(true);

		if (s.info) infoStage.set(s.info);
		if (s.state) scriptStage.set(s.state);
	};
</script>

<!-- This is a mess lmao -->
<div class="textbox">
	<!-- Suggestion panel -->
	{#if suggestions.length > 0}
		<div style="border-bottom-{side}-radius: 0px; margin-{opposite}: 50px" class="dark" />

		<div style="margin-{opposite}: 50px" class="suggestions">
			{#each suggestions as suggestion}
				<button on:click={() => suggestionSelected(suggestion)} class="name"
					>{suggestion.name}</button
				>
			{/each}
		</div>
	{/if}

	<!-- Actual typable textarea -->
	{#if boxVisible}
		<textarea
			transition:blur={{ duration: 500 }}
			style="border-bottom-{side}-radius: 0px; margin-{opposite}: 50px"
			cols={width}
			placeholder={hint}
			bind:value
			bind:this={box}
			{disabled}
			{readonly}
			rows={height}
		/>
	{/if}

	<!-- Send button -->
	{#if value?.length >= 1 && sendVisible}
		<button
			style="border-bottom-{opposite}-radius: 16px; margin-{opposite}: 50px"
			class="send"
			on:click={clicked}>Send</button
		>
	{/if}
</div>

<style>
	.dark {
		position: absolute;
		inset: 0;
		width: calc(100% - 50px);
		height: 100%;
		background-color: #0002;
		border-radius: 20px;
		z-index: 1;
	}
	.suggestions {
		position: absolute;
		top: 0;
		left: 0;
		width: calc(100% - 50px);
		display: grid;
		place-items: center;
		height: 100%;
		z-index: 2;
	}
	.suggestions .name {
		border: 0;
		background: var(--text2);
		padding: 5px;
		width: 40%;
		font-family: 'Lexend';
		color: var(--text);
	}
	.textbox {
		position: relative;
		height: 176px;
		padding: 0;
		margin: 0;
	}
	button.send {
		position: absolute;
		bottom: 3px;
		left: 3px;
		height: 30px;
		font-family: 'Lexend', sans-serif;
		font-size: 1.25em;
		color: var(--text);
		background: var(--text2);
		border: none;
		width: calc(100% - 50px - 6px);
		right: 3px;
	}
	button.send:hover {
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
