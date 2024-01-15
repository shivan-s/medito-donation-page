<script lang="ts">
	import { tweened } from 'svelte/motion';
	import { cubicIn } from 'svelte/easing';

	export let progress = 70;
	export let href = '';

	const _progress = tweened(0, {
		duration: 2000,
		easing: cubicIn
	});

	$: _progress.set(progress);
</script>

<a {href}>
	<div {...$$restProps} class="wrapper">
		<div class="bar" style="--progress: {$_progress.toString()}%"></div>
	</div>
</a>

<style>
	.wrapper {
		display: flex;
		width: 100%;
		height: 2rem;
		border-radius: 0.25rem;
		background-color: hsla(0, 0%, 95%, 1);
		box-shadow: inset 0.125rem 0.125rem 0.125rem hsla(0, 0%, 80%, 1);
	}
	.bar {
		width: var(--progress);
		height: 2rem;
		background-color: var(--primary);
		border-radius: 0.25rem;
		box-shadow: 0.125rem 0rem 0.5rem var(--primary);
	}

	.bar:hover {
		width: var(--progress);
		height: 2rem;
		background-color: var(--primary);
		border-radius: 0.25rem;
		box-shadow: 0.125rem 0rem 1rem var(--primary);
	}
</style>
