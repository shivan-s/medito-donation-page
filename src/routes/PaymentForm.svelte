<script lang="ts">
	import { onMount } from 'svelte';
	import { Stripe } from '$lib/client';
	import { error } from '@sveltejs/kit';
	import Button from '$components/Button.svelte';
	import Stack from '$components/Stack.svelte';
	import type { StripeError } from '@stripe/stripe-js';

	export let clientSecret: string;

	let err: StripeError;

	async function handleSubmit(e: CustomEvent<HTMLButtonElement>) {
		e.preventDefault();
		const stripe = await Stripe;
		if (stripe === null) {
			throw error(500);
		}
		const elements = stripe.elements({
			appearance: {
				theme: 'stripe',
				variables: { colorPrimary: '#72CA97', fontFamily: 'Inter, Helvetica, sans-serif' }
			},
			clientSecret
		});
		const result = await stripe.confirmPayment({
			elements,
			confirmParams: {
				return_url: './success'
			}
		});
		err = result.error;
	}

	onMount(async () => {
		const stripe = await Stripe;
		if (stripe === null) {
			throw error(500);
		}
		const elements = stripe.elements({
			appearance: {
				theme: 'stripe',
				variables: { colorPrimary: '#72CA97', fontFamily: 'Inter, Helvetica, sans-serif' }
			},
			clientSecret
		});
		const paymentElement = elements.create('payment', { layout: 'tabs' });
		paymentElement.mount('#payment-element');
	});

	$: err = err;
</script>

<form id="payment-form">
	<Stack>
		<div id="payment-element" />
		<Button
			form="payment-form"
			type="submit"
			directive="primary"
			id="submit"
			on:submit={handleSubmit}>Send Money</Button
		>
		{#if err}
			{err.message}
		{/if}
	</Stack>
</form>
