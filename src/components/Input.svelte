<script lang="ts">
	export let label: string;
	export let error: string | null;
</script>

<label>
	<span>{label}</span>
	<input {...$$restProps} />
	{#if error}
		<div class="error">{error}</div>
	{/if}
</label>

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

	label {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}
	.error {
		color: var(--danger);
	}
</style>
