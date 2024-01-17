<script lang="ts">
	import { onMount } from 'svelte';
	import { cubicIn, cubicOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';

	export let directive: 'primary' | 'secondary' = 'primary';
	export let disappear = false;
	export let delay = 6000;
	let show = true;
	onMount(() => {
		if (disappear === true) {
			setTimeout(() => {
				show = false;
			}, delay);
		}
	});
</script>

{#if show}
	<div in:fade={{ easing: cubicIn, duration: 0.5 }} out:fade={{ easing: cubicOut }} class="wrapper">
		<div
			class="box"
			class:primary={directive === 'primary'}
			class:secondary={directive === 'secondary'}
			{...$$restProps}
		>
			<span>
				<slot />
			</span>
		</div>
	</div>
{/if}

<style>
	.wrapper {
		display: flex;
		justify-content: center;
	}
	.box {
		background-color: hsla(0, 0%, 100%, 0.8);
		display: flex;
		justify-content: center;
		width: max-content;
		padding: 1rem 2rem 1rem 2rem;
		border-radius: 1rem;
		box-shadow: 0rem 0rem 0.25rem var(--primary);
	}
	.box:hover {
		box-shadow: 0rem 0rem 0.75rem var(--primary);
	}
	.secondary {
		background-color: var(--primary);
		box-shadow: 0rem 0rem 0.25rem hsla(0, 0%, 50%, 1);
	}
	.secondary:hover {
		box-shadow: 0rem 0rem 0.75rem hsla(0, 0%, 50%, 1);
	}
	span {
		word-wrap: none;
	}
</style>
