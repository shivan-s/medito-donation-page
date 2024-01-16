<script lang="ts">
	import Box from './Box.svelte';
	import H3 from './H3.svelte';
	import HStack from './HStack.svelte';
	const recentDonations = [
		{ name: 'Shivan', amount: 10, symbol: '$', currency: 'usd', title: 'Title' }
	];
</script>

<nav>
	<HStack>
		<H3 id="recents">Recent:</H3>
		{#each recentDonations as donation}
			<Box
				><strong>{donation.name}</strong> sent
				<span class="emphasis"
					>{donation.symbol}{donation.amount} {donation.currency.toUpperCase()}</span
				>
			</Box>
		{/each}
	</HStack>
</nav>

<style>
	nav {
		top: 0;
		padding: 0.25rem 0.5rem 0.25rem 0.5rem;
		z-index: 1;
		width: 100%;
		overflow-x: scroll;
	}
</style>
