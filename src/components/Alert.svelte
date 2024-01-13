<script lang="ts">
	export let directive: 'danger' | 'success' | null;
	export let title: string;
</script>

<div class:danger={directive === 'danger'} class:success={directive === 'success'} {...$$restProps}>
	<strong>{title}</strong>
	<span>
		<slot />
	</span>
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding: 1rem 2rem;
		border: 1px solid var(--primary-background);
		border-radius: 0.25rem;
	}

	.danger {
		color: var(--danger);
		border: 1px solid var(--danger);
	}

	.success {
		color: var(--primary);
		border: 1px solid var(--primary);
	}
</style>
