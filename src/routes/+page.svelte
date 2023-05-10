<script lang="ts">
	import Continue from '$lib/components/Continue.svelte';
	import InfoButton from '$lib/components/InfoButton.svelte';
	import InfoPanel from '$lib/components/InfoPanel.svelte';
	import Simulator from '$lib/components/Simulator.svelte';

	let panelToggled = false;

	let sim: Simulator;

	const infoClick = () => (panelToggled = true);
	const closeClick = () => (panelToggled = false);
</script>

<h1>HTTPS Simulator</h1>

<div class="center">
	<Simulator bind:this={sim} />
</div>

<div class="info-button">
	<InfoButton clicked={infoClick} />
</div>

{#if panelToggled}
	<div class="info-panel">
		<InfoPanel toggled={panelToggled} closed={closeClick} />
	</div>
{/if}

<style>
	.center {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.info-button {
		position: absolute;
		top: 5px;
		right: 5px;
		z-index: 1;
	}
	.info-panel {
		position: absolute;
		inset: 0;
		z-index: 2;
	}
</style>
