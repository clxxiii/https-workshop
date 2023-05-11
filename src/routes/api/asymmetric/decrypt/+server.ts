import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { asymmetric } from '$lib/crypto';

export const GET: RequestHandler = ({ url }) => {
	const ciphertext = url.searchParams.get('ciphertext')?.replaceAll(' ', '+');
	const key = url.searchParams.get('private_key');
	if (!key || !ciphertext) {
		throw error(400, 'Missing parameters');
	}

	const plaintext = asymmetric.decrypt(ciphertext, key);

	return json({ plaintext });
};
