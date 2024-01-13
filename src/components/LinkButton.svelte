<script lang="ts">
	export let directive: 'primary' | 'danger' | null = null;
	export let href: string;
</script>

<a
	class:primary={directive === 'primary'}
	class:danger={directive === 'danger'}
	{...$$restProps}
	{href}
>
	<slot />
</a>

<style>
	a {
		color: var(--primary-text);
		text-decoration: none;
		text-align: center;
		font-size: 1rem;
		padding: 0.75rem 1.5rem;
		border: none;
		border-radius: 0.25rem;
		box-shadow: 0.125rem 0.125rem 0.125rem hsla(0, 0%, 50%, 1);
		width: max-content;
	}
	.primary {
		background-color: var(--primary);
	}
	.danger {
		background-color: var(--danger);
	}
	a:hover {
		filter: brightness(90%);
	}
	a:active {
		filter: brightness(110%);
		box-shadow: 0rem 0rem 0rem 0rem;
	}
</style>
