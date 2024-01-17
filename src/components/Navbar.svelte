<script lang="ts">
	import Box from '$components/Box.svelte';
	import { onMount } from 'svelte';
	let recentDonations = [];

	onMount(() => {
		const delay = 2000;
		const interval = setInterval(() => {
			addDonations();
		}, delay);
		return () => clearInterval(interval);
	});

	let num = 0;

	function addDonations() {
		num = num + 1;
		recentDonations = [
			...recentDonations,
			{
				name: 'Shivan',
				amount: 10 + num,
				symbol: '$',
				currency: 'usd',
				title: 'Title'
			}
		];
	}
</script>

<nav>
	<Box directive="secondary" title="Recent donations"><b>Recent</b></Box>
	{#each recentDonations as donation}
		<Box disappear={true} delay={6000}
			><strong>{donation.name}</strong> sent
			<strong>{donation.symbol}{donation.amount} {donation.currency.toUpperCase()}</strong>
		</Box>
	{/each}
</nav>

<style>
	nav {
		display: flex;
		justify-content: center;
		gap: 0.5rem;
		top: 0;
		padding: 0.25rem 0.5rem 0.25rem 0.5rem;
		z-index: 1;
		width: 100%;
		overflow-x: hidden;
	}

	.reverse {
		display: flex;
		flex-direction: row-reverse;
	}
</style>
