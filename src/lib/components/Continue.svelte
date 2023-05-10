<script lang="ts">
	import { script } from '$lib/script';
	import { fly } from 'svelte/transition';
	export let sim: App.Sim;

	const click = () => script(sim);

	let visible = false;
	export const show = () => (visible = true);
	export const hide = () => (visible = false);
	export const toggle = () => (visible = !visible);
</script>

{#if visible}
	<button transition:fly={{ x: 50 }} on:click={click}> Continue </button>
{/if}

<style>
	button {
		margin-top: 30px;
		appearance: none;
		border: 0;
		color: var(--text2);
		background: none;
		text-transform: uppercase;
		cursor: pointer;
		font-family: 'Mohave';
		font-size: 2em;
		font-weight: 100;
		text-decoration: underline;
	}
	button:hover {
		font-weight: 500;
	}
</style>
