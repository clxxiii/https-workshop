<script lang="ts">
	import { fade } from "svelte/transition";
	import User from "./User.svelte";
	let wrap: HTMLDivElement;
	let message: HTMLDivElement;

	let eveVisible = true;

	const sleep = async (ms: number) =>
		await new Promise((resolve) => setTimeout(resolve, ms));

	export const animAtoB = async (delayMS: number) => {
		delayMS ??= 200;
		wrap.style.transform = 'translateY(0%)';
		await sleep(delayMS * 1.5);
		wrap.style.transition = `${delayMS * 1.5}ms ease`;
		wrap.style.opacity = '1';
		await sleep(delayMS);
		wrap.style.transform = 'translateY(100%)';
		await sleep(delayMS);
		wrap.style.opacity = '0';
		await sleep(delayMS * 2);
		wrap.style.transform = 'translateY(50%)';
	};

	export const animBtoA = async (delayMS: number) => {
		delayMS ??= 200;
		wrap.style.transform = 'translateY(100%)';
		await sleep(delayMS * 1.5);
		wrap.style.transition = `${delayMS * 1.5}ms ease`;
		wrap.style.opacity = '1';
		await sleep(delayMS);
		wrap.style.transform = 'translateY(0%)';
		await sleep(delayMS);
		wrap.style.opacity = '0';
		await sleep(delayMS * 2);
		wrap.style.transform = 'translateY(50%)';
	};

	export const toggleEve = (toggle?: boolean) => {
		if (toggle != null)	 {
			eveVisible = toggle;
			return;
		}
	
		eveVisible = !eveVisible;
	}
</script>

<div class="box">
	<div class="line">
		<div class="wrap" bind:this={wrap}>
			<div class="message" bind:this={message} />
		</div>
	</div>
	{#if eveVisible}
		<div transition:fade="{{ duration: 200 }}" class="hackline" />
		<div class="eve">
			<User name="Eve" />
		</div>
	{/if}
</div>

<style>
	.box {
		position: relative;
		display: flex;
		justify-content: center;
	}
	.line {
		position: relative;
		width: 0px;
		border: solid 2px var(--text2);
		height: 150px;
	}
	.wrap {
		opacity: 0;
		position: absolute;
		height: 100%;
		top: 0;
		transition: 0.3s ease;
	}
	.message {
		border-radius: 10px;
		border: solid 10px var(--text2);
		transform: translate(-10px, -10px);
	}

	.eve {
		position: absolute;
		top: calc(50% - 40px);
		left: 210px;
	}
	.hackline {
		position: absolute;
		left: 0;
		top: calc(50% - 4px);
		width: 200px;
		border-top-right-radius: 10px;
		border-bottom-right-radius: 10px;
		height: 0px;
		border: solid 2px var(--text2);	
	}
</style>
