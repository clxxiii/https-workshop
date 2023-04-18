const sleep = async (ms: number) => await new Promise((resolve) => setTimeout(resolve, ms));
const eveStealsMessage = async (sim: App.Sim) => {
	const topbox = sim.userATextbox.getBox();
	console.log(topbox.value);
	sim.userATextbox.setSendVisible(false);
	topbox.disabled = true;
	await sleep(500);
	sim.line.animAtoB(1000);
};
/**
 * The following function keeps track of, and runs the events of the "story"
 */

export const script = (num: number, sim: App.Sim) => {
	switch (num) {
		case 1:
			eveStealsMessage(sim);
			break;
	}
};
