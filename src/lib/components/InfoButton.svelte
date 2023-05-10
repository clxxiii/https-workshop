<script lang="ts">
	import { infoStage } from '$lib/stores';
	import { tweened } from 'svelte/motion';
	import { onMount } from 'svelte';
	export let clicked: () => any = () => console.log('Info Button Clicked!');

	let color = tweened(0, {
		duration: 300
	});

	let info: HTMLSpanElement;
	tweened;

	onMount(() => {
		infoStage.subscribe(async (i) => {
			if (i == 0) return;
			for (let i = 0; i < 3; i++) {
				await color.set(1);
				await color.set(0);
			}
		});
	});
</script>

<button on:click={clicked}>
	<div style="opacity: {$color}" class="background" />
	<span bind:this={info} class="material-symbols-outlined"> info </span>
</button>

<style>
	.background {
		position: absolute;
		background: #89dceb33;
		width: 64px;
		border-radius: 50px;
		height: 64px;
		filter: blur(5px);
		z-index: 1;
	}
	button {
		background: 0;
		width: 64px;
		height: 64px;
		margin: 0;
		padding: 0;
		border: 0;
		cursor: pointer;
		border-radius: 5px;
		transition: background 0.2s ease;
	}
	button:hover {
		background: #333;
	}
	span {
		position: relative;
		font-size: 64px;
		color: var(--text2);
		z-index: 2;
	}
	.material-symbols-outlined {
		font-variation-settings: 'FILL' 0, 'wght' 500, 'GRAD' 0, 'opsz' 48;
	}
</style>
