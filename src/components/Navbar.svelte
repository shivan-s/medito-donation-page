<script lang="ts">
	import Box from '$components/Box.svelte';
	import { onMount } from 'svelte';
	let recentDonations: {
		name?: string;
		amount: number;
		symbol: string;
		currency: string;
	}[] = [];

	onMount(() => {
		const delay = 2000;
		const interval = setInterval(() => {
			addDonations();
		}, delay);
		return () => clearInterval(interval);
	});

	function addDonations() {
		const recentDonation = {
			symbol: '$',
			currency: 'usd',
			amount: Math.floor(Math.random() * 1000) + 10
		};
		recentDonations = [recentDonation, ...recentDonations];
	}
</script>

<nav>
	<Box directive="secondary" title="Recent donations"><b>Recent</b></Box>
	{#each recentDonations as donation}
		<Box disappear={true} delay={6000}
			><strong>{donation.name ?? 'Anonymous'}</strong> sent
			<strong>{donation.symbol}{donation.amount} {donation.currency.toUpperCase()}</strong>
		</Box>
	{/each}
</nav>

<style>
	nav {
		backdrop-filter: blur(5px);
		display: flex;
		justify-content: center;
		gap: 0.5rem;
		padding: 0.25rem 0.5rem 0.25rem 0.5rem;
		z-index: 1;
		width: 100%;
		overflow-x: hidden;
	}
</style>
