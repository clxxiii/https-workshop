<script lang="ts">
	type Icon = 'person' | 'dns' | 'devices';
	export let icon: Icon = 'person';
	export let name: string;
</script>

<div class="user">
	<span class="material-symbols-outlined"> {icon} </span>
	<div class="label">{name}</div>
</div>

<style>
	.user {
		display: flex;
		flex-direction: column;
		align-items: center;
		min-width: 50px;
		width: fit-content;
	}
	.material-symbols-outlined {
		font-size: 50px;
		font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 64;
	}
</style>
