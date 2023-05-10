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
	sim.narration.say(
		'Eve',
		"I hope whatever you just sent wasn't TOO important.",
		'You should be more careful when sharing messages with other people.',
		'Let me walk you through the process of sending an encrypted message online!'
	);
};

/**
 * Story Function Manager
 */
export const script = (num: number, sim: App.Sim) => {
	switch (num) {
		case 1:
			eveStealsMessage(sim);
			break;
		case 2:
	}
};
