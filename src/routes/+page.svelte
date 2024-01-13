<script lang="ts">
	import Button from '$components/Button.svelte';
	import H1 from '$components/H1.svelte';
	import H2 from '$components/H2.svelte';
	import LinkButton from '$components/LinkButton.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: questionAnswersIdx = -1;
</script>

<H1 id="title">{data.title}</H1>
<p>
	{data.description}
</p>
<LinkButton href="#donations">Donate</LinkButton>
<section>
	<H2 id="progress">Progress</H2>
	<progress value="50" />
</section>
<section>
	<H2 id="q-and-a">Q & A</H2>
	<label
		>FAQ
		<select bind:value={questionAnswersIdx}>
			<option value={-1}>Choose a question</option>
			{#each data.questionAnswers as questionAnswer, idx}
				<option value={idx}>
					{questionAnswer.question}
				</option>
			{/each}
			<option value={-2}>Other</option>
		</select>
	</label>
	{#if data.questionAnswers[questionAnswersIdx]}
		<p>{data.questionAnswers[questionAnswersIdx].answer}</p>
	{:else if questionAnswersIdx === -2}
		<form method="POST" action="?/anotherQuestion">
			<label>
				Email
				<input type="email" required name="email" />
			</label>
			<label>
				Question
				<textarea minlength="5" maxlength="5000" required name="email" />
			</label>
			<Button directive="primary">Submit</Button>
		</form>
	{/if}
</section>
<section>
	<H2 id="donations">Donations</H2>
</section>
