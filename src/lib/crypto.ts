import { Buffer } from 'node:buffer';
import {
	randomBytes,
	createCipheriv,
	createDecipheriv,
	createHash,
	generateKeyPairSync,
	publicEncrypt,
	privateDecrypt
} from 'node:crypto';

const symAlgorithm = 'aes-256-ctr';

/*
 * The returned string is a base64 json object, which
 * contains the encrypted message and the IV
 */
const symEncrypt = (x: string, pass: string): string => {
	const iv = randomBytes(12).toString('base64');
	const key = createHash('sha256').update(pass).digest('base64').substring(0, 32);

	const cipher = createCipheriv(symAlgorithm, key, iv);
	let ciphertext = cipher.update(x, 'utf8', 'base64');
	ciphertext += cipher.final('base64');

	const outputObj = {
		ciphertext,
		iv
	};
	const output = Buffer.from(JSON.stringify(outputObj)).toString('base64');

	return output;
};

/**
 * Decrypts a value y given the same encryption password
 */
const symDecrypt = (y: string, pass: string): string => {
	const { ciphertext, iv } = JSON.parse(Buffer.from(y, 'base64').toString('ascii'));

	const key = createHash('sha256').update(pass).digest('base64').substring(0, 32);

	const decipher = createDecipheriv(symAlgorithm, key, iv);

	let plaintext = decipher.update(ciphertext, 'base64', 'utf8');
	plaintext += decipher.final('utf8');

	return plaintext;
};

/**
 * Generates a random public/private keypair
 */
const genKey = () => {
	const keyPair = generateKeyPairSync('rsa', {
		modulusLength: 512
	});

	const publicKeyRaw = keyPair.publicKey.export({
		type: 'pkcs1',
		format: 'pem'
	});
	const privateKeyRaw = keyPair.privateKey.export({
		type: 'pkcs1',
		format: 'pem'
	});
	// We could just use the pem key, this is to make it look better
	// In the demo.
	const publicKey = Buffer.from(publicKeyRaw).toString('base64');
	const privateKey = Buffer.from(privateKeyRaw).toString('base64');

	return { publicKey, privateKey };
};

const asymEncrypt = (x: string, publicKey: string) => {
	const key = Buffer.from(publicKey, 'base64').toString('ascii');

	let buffer;
	try {
		buffer = publicEncrypt(key, Buffer.from(x));
	} catch {
		return null;
	}
	return buffer.toString('base64');
};

const asymDecrypt = (y: string, privateKey: string) => {
	const key = Buffer.from(privateKey, 'base64').toString('ascii');

	let buffer;
	try {
		buffer = privateDecrypt(key, Buffer.from(y, 'base64'));
	} catch {
		return null;
	}
	return buffer.toString('ascii');
};

export const symmetric = { encrypt: symEncrypt, decrypt: symDecrypt };
export const asymmetric = { encrypt: asymEncrypt, decrypt: asymDecrypt, genKey };
