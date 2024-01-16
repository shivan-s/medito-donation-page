<script lang="ts">
	export let label: string | null = null;
	export let error: string[] | undefined = undefined;
</script>

{#if label}
	<label>
		<span>{label}</span>
		<input {...$$restProps} />
		{#if error}
			<div class="error">{error}</div>
		{/if}
	</label>
{:else}
	<div>
		<input {...$$restProps} />
		{#if error}
			<div class="error">{error}</div>
		{/if}
	</div>
{/if}

<style>
	input {
		line-height: 1.5;
		font-size: 1.125rem;
		padding: 0.25rem 0.5rem;
		outline: none;
		border-radius: 0.25rem;
		border: 1px solid hsla(0, 0%, 50%, 1);
	}

	input:user-invalid {
		outline: 2px solid var(--danger);
	}

	input:focus {
		outline: 2px solid var(--primary);
	}

	label,
	div {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}
	.error {
		color: var(--danger);
	}
</style>
