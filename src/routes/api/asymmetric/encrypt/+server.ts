import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { asymmetric } from '$lib/crypto';

export const GET: RequestHandler = ({ url }) => {
	const plaintext = url.searchParams.get('plaintext');
	const key = url.searchParams.get('public_key');

	if (!key || !plaintext) {
		throw error(400, 'Missing parameters');
	}

	let ciphertext;
	try {
		ciphertext = asymmetric.encrypt(plaintext, key);
	} catch (RangeError) {
		throw error(413, 'Plaintext cannot be longer than 86 characters');
	}

	return json({ ciphertext });
};
