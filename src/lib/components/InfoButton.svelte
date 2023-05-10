<script lang="ts">
	export let clicked: () => any = () => console.log('Info Button Clicked!');
</script>

<button on:click={clicked}>
	<span class="material-symbols-outlined"> info </span>
</button>

<style>
	button {
		background: 0;
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
		font-size: 64px;
		color: var(--text2);
	}
	.material-symbols-outlined {
		font-variation-settings: 'FILL' 0, 'wght' 500, 'GRAD' 0, 'opsz' 48;
	}
</style>
