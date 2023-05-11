import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { symmetric } from '$lib/crypto';

export const GET: RequestHandler = ({ url }) => {
	const ciphertext = url.searchParams.get('ciphertext');
	const key = url.searchParams.get('key');

	if (!key || !ciphertext) {
		throw error(400, 'Missing parameters');
	}

	const plaintext = symmetric.decrypt(ciphertext, key);

	return json({ plaintext });
};
