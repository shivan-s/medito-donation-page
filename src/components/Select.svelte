<script lang="ts">
	export let label: string;
	export let value: string | number;
</script>

<label>
	<span>{label}</span>
	<select bind:value {...$$restProps}><slot /></select>
</label>

<style>
	select {
		line-height: 1.5;
		font-size: 1.125rem;
		padding: 0.25rem 0.5rem;
		outline: none;
		border-radius: 0.25rem;
		border: 1px solid hsla(0, 0%, 50%, 1);
		background-color: inherit;
	}

	select:focus {
		outline: 2px solid var(--primary);
	}

	label {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}
</style>
