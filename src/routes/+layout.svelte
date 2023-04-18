<script>
	import Footer from '$lib/components/Footer.svelte';
	import '../app.css';
</script>

<main>
	<slot />
</main>

<footer>
	<Footer />
</footer>

<style>
	footer {
		height: 50px;
	}
	main {
		min-height: calc(100vh - 90px);
	}
</style>
