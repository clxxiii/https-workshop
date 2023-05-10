import { get } from 'svelte/store';
import { infoStage, scriptStage } from './stores';

const sleep = async (ms: number) => await new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Story Functions
 */
const eveStealsMessage = async (sim: App.Sim) => {
	const topbox = sim.userATextbox.getBox();
	console.log(topbox.value);
	sim.userATextbox.setSendVisible(false);
	topbox.disabled = true;
	await sim.line.animAtoB(300);
	sim.userBTextbox.getBox().placeholder = topbox.value;
	await sleep(1500);
	await sim.line.toggleEve(true);
	await sleep(1500);
	await sim.narration.say(
		'Eve',
		"I hope whatever you just sent wasn't TOO important.",
		'Lets encrypt your message so nobody else can see it.'
	);
	scriptStage.set(2);
	infoStage.set(1);
	await sim.cont.show();
};

const clientHello = async (sim: App.Sim) => {
	sim.cont.hide();
};

/**
 * Story Function Manager
 */
export const script = (sim: App.Sim, num?: number) => {
	num = num ?? get(scriptStage);
	switch (num) {
		case 1:
			eveStealsMessage(sim);
			break;
		case 2:
			clientHello(sim);
			break;
	}
};
