import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { symmetric } from '$lib/crypto';

export const GET: RequestHandler = ({ url }) => {
	const plaintext = url.searchParams.get('plaintext');
	const key = url.searchParams.get('key');

	if (!key || !plaintext) {
		throw error(400, 'Missing parameters');
	}

	const ciphertext = symmetric.encrypt(plaintext, key);

	return json({ ciphertext });
};
