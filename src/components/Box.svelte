<div {...$$restProps}>
	<span>
		<slot />
	</span>
</div>

<style>
	div {
		display: flex;
		justify-content: center;
		padding: 1rem 2rem 1rem 2rem;
		border-radius: 1rem;
		box-shadow: 0rem 0rem 0.25rem var(--primary);
	}

	div:hover {
		box-shadow: 0rem 0rem 0.75rem var(--primary);
	}
</style>
