const sleep = async (ms: number) => await new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Story Functions
 */
const eveStealsMessage = async (sim: App.Sim) => {
	const topbox = sim.userATextbox.getBox();
	console.log(topbox.value);
	sim.userATextbox.setSendVisible(false);
	topbox.disabled = true;
	await sleep(500);
	sim.line.animAtoB(300);
	await sleep(1500);
	sim.userBTextbox.getBox().placeholder = topbox.value;
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
