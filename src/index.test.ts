import { test, expect } from 'vitest';
import { symmetric, asymmetric } from '$lib/crypto';

test('encryption/decryption using aes', () => {
	const plaintext = 'sup';
	const password = 'This is a password';

	const ciphertext = symmetric.encrypt(plaintext, password);
	const dPlaintext = symmetric.decrypt(ciphertext, password);
	expect(ciphertext).not.toBeNull();
	expect(dPlaintext).toBe(plaintext);
});

test('wrong key encryption/decryption', () => {
	const plaintext = 'Hi!';
	const ciphertext = symmetric.encrypt(plaintext, 'I know the password');
	expect(symmetric.decrypt(ciphertext, 'I know the password')).toBe(plaintext);
	expect(symmetric.decrypt(ciphertext, "I don't know the password")).not.toBe(plaintext);
});

test('asymmetric encryption/decryption', () => {
	const plaintext = 'The maximum size for a key is 46 chars long';

	const keyPair = asymmetric.genKey();
	const ciphertext = asymmetric.encrypt(plaintext, keyPair.publicKey);
	expect(ciphertext).not.toBeNull();
	if (!ciphertext) return;
	const dPlaintext = asymmetric.decrypt(ciphertext, keyPair.privateKey);

	expect(dPlaintext).toBe(plaintext);
});

test('asymmetric key too long', () => {
	const plaintext =
		'This passphrase needs to be longer than 86 characters to break the async cipher. This text is longer than 86 characters.';

	const keyPair = asymmetric.genKey();
	const getCipherText = () => asymmetric.encrypt(plaintext, keyPair.publicKey);

	expect(getCipherText).toThrowError('Plaintext too long');
});
