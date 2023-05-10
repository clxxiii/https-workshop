import { writable } from 'svelte/store';

// Keeps track of what stage the story is in
const scriptStage = writable(1);

// Keeps track of what section should be shown
// in the info tab
const infoStage = writable(0);

export { scriptStage, infoStage };
