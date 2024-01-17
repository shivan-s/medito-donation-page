<script lang="ts">
	import Box from '$components/Box.svelte';
	import { onMount } from 'svelte';
	import { currencyFormatter } from '$lib/client';

	let recentDonation: {
		name?: string;
		amount: number;
		symbol: string;
		currency: string;
	} | null = null;

	onMount(() => {
		const delay = 4000;
		const interval = setInterval(() => {
			newDonation();
		}, delay);
		return () => clearInterval(interval);
	});

	function newDonation() {
		recentDonation = {
			symbol: '$',
			currency: 'usd',
			amount: Math.floor(Math.random() * 1000) + 10
		};
	}
</script>

<nav>
	{#if recentDonation}
		<Box
			><strong>{recentDonation.name ?? 'Anonymous'}</strong> recently donated
			<strong
				>{currencyFormatter.format(recentDonation.amount)}
				{recentDonation.currency.toUpperCase()}</strong
			>
		</Box>
	{:else}
		<Box>Recent Donations</Box>
	{/if}
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
