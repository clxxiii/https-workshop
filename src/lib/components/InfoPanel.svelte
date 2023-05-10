<script lang="ts">
	import { fade, slide } from 'svelte/transition';

	export let toggled = false;
	export let content = 'hi hi hi hi hi hi hello hello hello hi hi hi';

	export let closed: () => any = () => console.log('Menu Closed!');
</script>

{#if toggled}
	<button transition:fade={{ duration: 200 }} on:click={closed} class="dark" />
	<div transition:slide={{ axis: 'x', duration: 200 }} class="menu">
		<button on:click={closed}>
			<span class="material-symbols-outlined close"> close </span>
		</button>
		<div class="content">
			{content}
		</div>
	</div>
{/if}

<style>
	.dark {
		position: absolute;
		inset: 0;
		background-color: #000a;
		backdrop-filter: blur(3px);
		z-index: 0;
	}
	.menu {
		position: absolute;
		top: 0;
		right: 0;
		width: 400px;
		height: 100%;
		background-color: #222;
		z-index: 1;
	}
	.content {
		width: 400px;
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
