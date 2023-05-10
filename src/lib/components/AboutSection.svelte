<script lang="ts">
	import { infoStage } from '$lib/stores';

	export let id: number;
	export let force = false;
	export let name: string;

	const sectionId = name.replaceAll(' ', '-').toLowerCase();
</script>

{#if $infoStage == id || force}
	<section id={sectionId}>
		<h2>{name}</h2>
		<slot />
	</section>
{/if}

<style>
	h2 {
		font-size: 2em;
		margin: 0;
	}
</style>
