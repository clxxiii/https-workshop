<script lang="ts">
	import About from '$lib/About.svelte';
	import { fade, slide } from 'svelte/transition';

	export let toggled = false;

	export let closed: () => any = () => console.log('Menu Closed!');
</script>

{#if toggled}
	<button transition:fade={{ duration: 200 }} on:click={closed} class="dark" />
	<div transition:slide={{ axis: 'x', duration: 200 }} class="menu">
		<h1>Info</h1>
		<button on:click={closed}>
			<span class="material-symbols-outlined close"> close </span>
		</button>
		<div class="content">
			<About />
		</div>
	</div>
{/if}

<style>
	h1 {
		position: absolute;
		text-transform: uppercase;
		top: 5px;
		left: 10px;
		font-family: 'Mohave';
		font-weight: 100;
		margin: 0;
		color: var(--text2);
	}
	.dark {
		position: absolute;
		inset: 0;
		background-color: #000a;
		z-index: 0;
	}
	.menu {
		position: absolute;
		top: 0;
		right: 0;
		width: 400px;
		height: 100%;
		background-color: #222;
		box-shadow: -5px 0 10px black;
		z-index: 1;
	}
	.content {
		position: relative;
		top: 50px;
		padding: 10px;
		width: calc(400px - 20px);
	}
	button {
		background-color: #0000;
		border: none;
		margin: 0;
		padding: 0;
		color: var(--text);
	}
	.menu .close {
		position: absolute;
		top: 5px;
		right: 5px;
		cursor: pointer;
		font-size: 64px;
	}
</style>
