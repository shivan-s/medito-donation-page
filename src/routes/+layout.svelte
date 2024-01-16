<script lang="ts">
	import { page } from '$app/stores';
	import { cubicInOut } from 'svelte/easing';
	import type { LayoutData } from './$types';
	import { fade } from 'svelte/transition';

	const title = $page.data['title'];
	export let data: LayoutData;
</script>

<svelte:head>
	{#if title}
		<title>
			{title} - Medito
		</title>
	{:else}
		<title>Medito</title>
	{/if}
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
		rel="stylesheet"
	/>
	<script src="https://js.stripe.com/v3/"></script>
</svelte:head>
<header />
{#key data.routeURL}
	<main in:fade={{ easing: cubicInOut }}>
		<slot />
	</main>
{/key}
<footer />

<style>
	:global(:root) {
		--primary-text: hsla(240, 17%, 8%, 1); /* #111118 */
		--primary-background: hsla(0, 0%, 100%, 1);
		--primary: hsla(145, 45%, 62%, 1) /* #72CA97 */;
		--danger: hsla(4, 44%, 79%, 1) /* #C97771 */;
	}
	:global(*) {
		line-height: 1;
		padding: 0;
		margin: 0;
		box-sizing: border-box;
		transition: all 0.2s ease-in-out 0s;
		font-family: 'Inter', 'Helvetica', sans-serif;
	}
	:global(html) {
		scroll-padding: 10rem;
		scroll-behavior: smooth;
	}
	:global(body) {
		color: var(--primary-text);
		background-color: var(--primary-background);
	}
	:global(:target) {
		outline: 3px dotted var(--primary-text);
	}

	:global(p) {
		font-size: 1.125rem;
	}

	:global(ul) {
		padding-left: 1rem;
		list-style-position: inside;
	}

	main {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		gap: 1rem;
		margin: 1rem 0rem 3rem 0rem;
		padding: 4rem 0rem;
		margin-right: auto;
		margin-left: auto;
		max-width: 768px;
	}
	/* Extra small devices (phones, 600px and down) */
	@media only screen and (max-width: 600px) {
		main {
			min-width: 320px;
			padding-left: 0.5rem;
			padding-right: 0.5rem;
		}
	}

	/* Small devices (portrait tablets and large phones, 600px and up) */
	@media only screen and (min-width: 600px) {
		main {
			min-width: 480px;
			padding-left: 1rem;
			padding-right: 1rem;
		}
	}

	/* Medium devices (landscape tablets, 768px and up) */
	@media only screen and (min-width: 768px) {
		main {
			min-width: 600px;
			padding-left: 2rem;
			padding-right: 2rem;
		}
	}

	/* Large devices (laptops/desktops, 992px and up) */
	@media only screen and (min-width: 992px) {
		main {
			min-width: 768px;
			padding-left: 4rem;
			padding-right: 4rem;
		}
	}

	/* Extra large devices (large laptops and desktops, 1200px and up) */
	@media only screen and (min-width: 1200px) {
		main {
			min-width: 922px;
			padding-left: 6rem;
			padding-right: 6rem;
		}
	}
</style>
