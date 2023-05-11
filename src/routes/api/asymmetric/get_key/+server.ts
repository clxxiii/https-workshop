import { asymmetric } from '$lib/crypto';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = () => {
	const keys = asymmetric.genKey();
	return json(keys);
};
