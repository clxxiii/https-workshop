import { get } from 'svelte/store';
import { asymKey, infoStage, scriptStage } from './stores';

const sleep = async (ms: number) => await new Promise((resolve) => setTimeout(resolve, ms));

let pass: string;

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
	sim.userATextbox.setValue('');
	sim.userBTextbox.setPlaceholder('');
	await sim.narration.say(
		'Eve',
		'If Alice wants to set up a secure connection with Bob, she first has to introduce herself, and state which cryptosystems she can use.'
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
		'If Bob accepts the request, Bob can respond back and choose from the cipher suites Alice outlined.'
	);
	await sim.userBTextbox.setSuggestions({
		name: 'Respond and use RSA',
		text: `Let's use RSA, here's my public key: ${get(asymKey).publicKey}`,
		state: 4,
		info: 3
	});
};

const serverHello = async (sim: App.Sim) => {
	sim.userBTextbox.setSendVisible(false);
	sim.userBTextbox.setDisabled(true);
	await sim.line.animBtoA(300);
	sim.userATextbox.setValue('');
	sim.userATextbox.setPlaceholder(sim.userBTextbox.getValue());
	await sim.narration.say(
		'Eve',
		"Now that we have Bob's public key, we can send him our symmetric key."
	);
	sim.pass.show();
	scriptStage.set(5);
};

const sendKeyExchange = async (sim: App.Sim) => {
	pass = sim.pass.getValue();
	sim.userATextbox.setValue(pass);
	sim.userBTextbox.setValue('');
	sim.userBTextbox.setPlaceholder('');
	await sim.narration.say('Alice', "I'm using Bob's private key to encrypt this message.");
	const { publicKey } = get(asymKey);

	const encryptedKeyReq = await fetch(
		`/api/asymmetric/encrypt?public_key=${publicKey}&plaintext=${pass}`
	);
	const { ciphertext } = await encryptedKeyReq.json();

	await sim.userATextbox.fadeToValue(ciphertext);
	await sim.line.animAtoB();
	sim.userBTextbox.setValue();
	await sim.narration.say('Bob', "I'm using my private key to decrypt this message.");
	await sim.userBTextbox.fadeToValue(pass);
	sim.userATextbox.setValue(pass);
	await sim.narration.say(
		'Eve',
		'Alice and Bob now have the same piece of text, and I have absolutely no way of getting that text myself!'
	);
	infoStage.set(5);
	scriptStage.set(6);
	sim.cont.show();
};

const keyExchangeComplete = async (sim: App.Sim) => {
	sim.cont.hide();
	await sim.narration.say(
		'Eve',
		'With a shared secret, now you guys can freely engage in secure communication!'
	);
	sim.userATextbox.setSendVisible(true);
	sim.userATextbox.setReadOnly(false);
	sim.userATextbox.setDisabled(false);
	sim.userATextbox.setPlaceholder('Click here to send a secure message to Bob');
	sim.userBTextbox.setSendVisible(true);
	sim.userBTextbox.setReadOnly(false);
	sim.userBTextbox.setDisabled(false);
	sim.userBTextbox.setPlaceholder('Click here to send a secure message to Alice');
	infoStage.set(6);
	scriptStage.set(7);
};

/**
 * Post-story send functions
 */
const aliceToBob = async (sim: App.Sim) => {
	const plaintext = sim.userATextbox.getValue();
	const url = `/api/symmetric/encrypt?plaintext=${plaintext}&key=${pass}`;
	const ciphertextReq = await fetch(url);
	const { ciphertext } = await ciphertextReq.json();

	sim.userATextbox.setDisabled(true);
	sim.userBTextbox.setDisabled(true);
	sim.userATextbox.setSendVisible(false);
	sim.userBTextbox.setSendVisible(false);

	await sleep(1000);
	await sim.userATextbox.fadeToValue(ciphertext);
	await sim.line.animAtoB();
	sim.userBTextbox.setValue(ciphertext);
	sim.userATextbox.setValue('');
	await sleep(1000);
	sim.userBTextbox.fadeToValue(plaintext);
	await sleep(1500);

	sim.userATextbox.setDisabled(false);
	sim.userBTextbox.setDisabled(false);
	sim.userATextbox.setSendVisible(true);
	sim.userBTextbox.setSendVisible(true);
};

const bobToAlice = async (sim: App.Sim) => {
	const plaintext = sim.userBTextbox.getValue();
	const url = `/api/symmetric/encrypt?plaintext=${plaintext}&key=${pass}`;
	const ciphertextReq = await fetch(url);
	const { ciphertext } = await ciphertextReq.json();

	sim.userATextbox.setDisabled(true);
	sim.userBTextbox.setDisabled(true);
	sim.userATextbox.setSendVisible(false);
	sim.userBTextbox.setSendVisible(false);

	await sleep(1000);
	await sim.userBTextbox.fadeToValue(ciphertext);
	await sim.line.animBtoA();
	sim.userATextbox.setValue(ciphertext);
	sim.userBTextbox.setValue('');
	await sleep(1000);
	sim.userATextbox.fadeToValue(plaintext);
	await sleep(1500);

	sim.userATextbox.setDisabled(false);
	sim.userBTextbox.setDisabled(false);
	sim.userATextbox.setSendVisible(true);
	sim.userBTextbox.setSendVisible(true);
};

/**
 * Story Function Manager
 */
export const script = (sim: App.Sim, boxName?: string) => {
	const num = get(scriptStage);
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
		case 4:
			serverHello(sim);
			break;
		case 5:
			sendKeyExchange(sim);
			break;
		case 6:
			keyExchangeComplete(sim);
			break;
		case 7:
			boxName == 'Alice' ? aliceToBob(sim) : bobToAlice(sim);
			break;
	}
};
