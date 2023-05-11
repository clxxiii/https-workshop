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
	const plaintext = 'Hi!';

	const keyPair = asymmetric.genKey();
	const ciphertext = asymmetric.encrypt(plaintext, keyPair.publicKey);
	const dPlaintext = asymmetric.decrypt(ciphertext, keyPair.privateKey);

	expect(dPlaintext).toBe(plaintext);
	expect(asymmetric.decrypt(ciphertext, keyPair.publicKey)).not.toBe(plaintext);
});
