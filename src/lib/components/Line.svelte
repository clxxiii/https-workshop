<script lang="ts">
	let wrap: HTMLDivElement;
	let message: HTMLDivElement;

	export const sleep = async (ms: number) =>
		await new Promise((resolve) => setTimeout(resolve, ms));

	export const animAtoB = async (delayMS: number) => {
		delayMS ??= 200;
		wrap.style.transform = 'translateY(10%)';
		await sleep(delayMS);
		wrap.style.transform = 'translateY(0%)';
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
		wrap.style.transform = 'translateY(90%)';
		await sleep(delayMS);
		wrap.style.transition = `${delayMS * 1.5}ms ease`;
		wrap.style.transform = 'translateY(100%)';
		wrap.style.opacity = '1';
		await sleep(delayMS);
		wrap.style.transform = 'translateY(0%)';
		await sleep(delayMS);
		wrap.style.opacity = '0';
		await sleep(delayMS * 2);
		wrap.style.transform = 'translateY(50%)';
	};
</script>

<div class="box">
	<div class="line">
		<div class="wrap" bind:this={wrap}>
			<div class="message" bind:this={message} />
		</div>
	</div>
</div>

<style>
	.box {
		width: 10em;
		display: flex;
		justify-content: center;
	}
	.line {
		position: relative;
		width: 0px;
		border: solid 2px var(--text2);
		height: 100px;
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

	@media screen and (min-width: 1200.5px) {
		.box {
			transform: rotate(-90deg) translateX(-40px);
		}
		.line {
			height: calc(10em + 100px);
		}
	}
</style>
