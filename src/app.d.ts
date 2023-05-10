import type Line from '$lib/components/Line.svelte';
import type Narration from '$lib/components/Narration.svelte';
import type TextBox from '$lib/components/TextBox.svelte';
import type Continue from '$lib/components/Continue.svelte';

declare global {
	namespace App {
		type UserIcon = 'user' | 'icon';

		type Sim = {
			line: Line;
			userATextbox: TextBox;
			userBTextbox: TextBox;
			narration: Narration;
			cont: Continue;
		};
	}
}

export {};
