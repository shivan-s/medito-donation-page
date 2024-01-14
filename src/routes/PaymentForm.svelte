<script lang="ts">
	import { onMount } from 'svelte';
	import { Stripe } from '$lib/client';
	import { error } from '@sveltejs/kit';
	import Button from '$components/Button.svelte';
	import Stack from '$components/Stack.svelte';

	export let clientSecret: string;

	onMount(async () => {
		const stripe = await Stripe;
		if (stripe === null) {
			throw error(500);
		}
		const elements = stripe.elements({
			appearance: { theme: 'stripe' },
			clientSecret
		});
		const paymentElement = elements.create('payment', { layout: 'tabs' });
		paymentElement.mount('#payment-element');
	});
</script>

<form id="payment-form">
	<Stack>
		<div id="payment-element" />
		<Button type="submit" directive="primary" id="submit">Pay now</Button>
	</Stack>
</form>
