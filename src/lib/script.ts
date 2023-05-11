import { get } from 'svelte/store';
import { asymKey, infoStage, scriptStage } from './stores';

enum RequestType {
	MagicEnvelope,
	RSA
}

const sleep = async (ms: number) => await new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Story Functions
 */
const eveStealsMessage = async (sim: App.Sim) => {
	sim.userATextbox.setSendVisible(false);
	sim.userATextbox.setDisabled(true);
	await sim.line.animAtoB(300);
	sim.userBTextbox.setPlaceholder(sim.userATextbox.getValue());
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
	sim.line.toggleEve(false);
	sim.userATextbox.setValue('');
	sim.userBTextbox.setPlaceholder('');
	await sim.narration.say(
		'Eve',
		'If alice wants to set up a secure connection with bob, she first has to introduce herself, and state which cryptosystems she can use.'
	);
	await sim.userATextbox.setSuggestions({
		name: 'Say Hello',
		text: "Hi Bob! I'd like to set up a secure connection with you. I can exchange keys with RSA, and I can encrypt messages using AES.",
		state: 3,
		info: 2
	});
};

const sendClientHello = async (sim: App.Sim) => {
	sim.userATextbox.setDisabled(true);
	sim.userATextbox.setSendVisible(false);
	await sim.line.animAtoB(300);
	sim.userBTextbox.setPlaceholder(sim.userATextbox.getValue());
	await sim.narration.say(
		'Eve',
		'If Bob accepts the request, Bob can respond back and choose from the cipher suites alice outlined.'
	);
	await sim.userBTextbox.setSuggestions(
		// {
		// 	name: 'Use Magic Envelope',
		// 	text: "Let's use Magic Envelope, Here's my envelope: ",
		// 	state: 4,
		// 	info: 4
		// },
		{
			name: 'Respond and use RSA',
			text: `Let's use RSA, here's my public key: ${get(asymKey).publicKey}`,
			state: 5,
			info: 3
		}
	);
};

const serverHello = async (sim: App.Sim, r: RequestType) => {
	let sentItem;
	if (r == RequestType.RSA) sentItem = 'RSA Public Key';

	sim.userBTextbox.setDisabled(true);
	await sim.line.animBtoA(300);
	sim.userATextbox.setPlaceholder(sim.userBTextbox.getValue());
	sim.narration.say(
		'Eve',
		"Now that we have Bob's " + sentItem + ', we can send him our symmetric key.'
	);
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
		case 3:
			sendClientHello(sim);
			break;
		// case 4:
		// 	serverHello(sim, RequestType.MagicEnvelope);
		// 	break;
		case 5:
			serverHello(sim, RequestType.RSA);
			break;
	}
};
