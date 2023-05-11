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
	<h2>The HTTPS Protocol</h2>
	<p>
		The <b>http://</b> that sits in front of any url stands for <b>H</b>yper<b>t</b>ext
		<b>T</b>ransfer <b>P</b>rotocol, and it's used to transer text from place to place over the
		internet (Like this website!)
	</p>
	<p>
		<b>HTTPS</b> is a layer that is added on top of the HTTP protocol, that ensures the messages
		that are sent are <b>Encrypted.</b>
	</p>
	<p>
		The two text boxes with the line between them represents the <b>HTTP</b> protocol. This demo shows
		the steps that go into adding the encryption to the existing protocol.
	</p>
</AboutSection>

<AboutSection name="Client Hello" id={2} {force}>
	<p>
		The client hello is one of two messages that are <b>unencrypted</b> during the HTTPS process,
		the other being the server hello. This means that whoever is in charge of your internet, your
		ISP or workplace, will be able to see the delivery target. In other words, they'd be able to see
		that you are visiting <b>youtube.com</b>, but they wouldn't be able to know what video you're
		watching.
	</p>
	<h2>A note on VPNs</h2>
	<p>
		VPNs have become quite popular in recent years mostly due to advertising. While it is true that
		a VPN can make your connection more secure, some of the advertising and promotion you hear may
		give the wrong impression.
	</p>
	<p>
		A VPN is essentially just a program that directs all your internet traffic to another computer,
		where that computer makes all the requests for you and sends them back.
	</p>
	<p>
		When you use a VPN, your ISP will no longer be able to tell what websites you visit, but they <b
			>will</b
		> be able to tell that you're using a VPN. Moreover, instead of your ISP knowing what websites you
		visit, your VPN provider now has access to that information because the client
	</p>
</AboutSection>

<AboutSection name="Server Hello" id={3} {force}>
	<p>
		Communicating securely with another party over the internet requires both an asymmetric cipher,
		and a symmetric cipher. In the server hello, the server decides which systems to use based on
		what the client (in this case, Alice) said they supported.
	</p>
	<h2>Asymmetric and Symmetric Ciphers</h2>
	<p>There are two types of cryptosystems, or ways in which to send an encrypted message.</p>
	<ul>
		<li>
			<b>Public Key/Assymetric</b> cryptosystems are systems in which a message is encryped with a
			public key, and then can only be decrypted using a private key. In the HTTPS process, this
			cipher is used to share the key for a <b>private key cryptosystem</b>
		</li>
		<br />
		<li>
			<b>Private Key/Symmetric</b> cryptosystems are systems in which a message is encrypted and decrypted
			with the same, or closely related keys. These systems are more secure because no information is
			made public besides the encrypted version message being sent.
		</li>
	</ul>
</AboutSection>
