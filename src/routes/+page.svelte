<script lang="ts">
	import Simulator from '$lib/components/Simulator.svelte';
</script>

<h1>HTTPS Simulator</h1>

<div class="center">
	<Simulator />
</div>

<!-- <span class="material-symbols-outlined"> -->
<!-- person -->
<!-- </span> -->

<style>
	.center {
		width: 100%;
		display: flex;
		justify-content: center;
	}

	@media screen and (max-width: 1200px) {
		.center {
			flex-direction: column;
			align-items: center;
		}
	}
</style>
