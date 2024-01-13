<script lang="ts">
	export let label: string;
	export let name: string;
	export let value: string;
	export let error: string | null;
</script>

<label>
	<span>{label}</span>
	<span
		bind:innerHTML={value}
		class="textarea"
		role="textbox"
		contenteditable
		data-placeholder="I have a question..."
		{...$$restProps}
	/>
	<input {...$$restProps} type="hidden" {name} bind:value />
	{#if error}
		<div class="error">{error}</div>
	{/if}
</label>

<style>
	[contenteditable] {
		line-height: 1.5;
		font-size: 1.125rem;
		padding: 0.25rem 0.5rem;
		outline: none;
		border-radius: 0.25rem;
		border: 1px solid hsla(0, 0%, 50%, 1);
		white-space: normal;
		word-wrap: break-word;
		overflow: auto;
		min-height: 10rem;
		max-height: 30rem;
	}
	[contenteditable]:empty:before {
		content: attr(data-placeholder);
		color: hsla(0, 0%, 50%, 1);
	}
	[contenteditable]:focus {
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
