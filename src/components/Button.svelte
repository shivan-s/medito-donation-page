<script lang="ts">
	export let directive: 'primary' | 'danger' | null = null;
	export let loading = false;
</script>

<button
	disabled={loading}
	class:primary={directive === 'primary'}
	class:danger={directive === 'danger'}
	{...$$restProps}
>
	<slot />
</button>

<style>
	button {
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
	button:hover {
		filter: brightness(90%);
	}
	button:active {
		filter: brightness(110%);
		box-shadow: none;
	}
	button:disabled {
		filter: brightness(110%) saturate(30%);
		box-shadow: none;
	}
</style>
