<script lang="ts">
	import AboutSection from './components/AboutSection.svelte';

	export let force = false;
</script>

<AboutSection id={0} {force} name="Intro">
	<p>
		Welcome to the demo! You can find this text either by clicking on the info button in the top
		right corner of the home page, or by clicking the about link at the bottom.
	</p>
	<p>
		This page will serve as a guide throughout the demo to clarify steps in the process, as well as
		connect the concepts in the demonstration to what actually happens in the real world.
	</p>
</AboutSection>

<AboutSection id={1} {force} name="Not Secure">
	<p>
		If there are no protections in place for encrypting the messages you send, the messages are
		freely available to anyone listening in. When there's no HTTPS protocol in place, this is
		exactly what's happening!
	</p>
	<p>
		Entering any sensitive information into a site marked as "Not Secure" is equivalent to shouting
		your credit card number to the cashier at the supermarket. Anyone that cares to listen in will
		have enough information to purchase things on your behalf.
	</p>
</AboutSection>
