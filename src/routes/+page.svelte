<script lang="ts">
	import InfoButton from '$lib/components/InfoButton.svelte';
	import InfoPanel from '$lib/components/InfoPanel.svelte';
	import Simulator from '$lib/components/Simulator.svelte';
	import { infoStage, asymKey } from '$lib/stores';
	import { onMount } from 'svelte';

	let panelToggled = false;

	let sim: Simulator;

	const infoClick = () => (panelToggled = true);
	const closeClick = () => (panelToggled = false);

	onMount(() => {
		infoClick();
		// Show info panel when it changes
		infoStage.subscribe(infoClick);
		fetch('/api/asymmetric/get_key').then((res) => res.json().then((key) => asymKey.set(key)));
	});
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
