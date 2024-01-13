<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import Alert from '$components/Alert.svelte';
	import Button from '$components/Button.svelte';
	import H1 from '$components/H1.svelte';
	import H2 from '$components/H2.svelte';
	import Input from '$components/Input.svelte';
	import LinkButton from '$components/LinkButton.svelte';
	import Stack from '$components/Stack.svelte';
	import TextArea from '$components/TextArea.svelte';
	import type { PageData, ActionData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';

	export let data: PageData;
	export let form: ActionData;

	const { form: anotherQuestionForm, constraints: anotherFormConstraints } = superForm(
		data.anotherQuestionForm
	);

	$: questionAnswersIdx = -2;
</script>

<svelte:head>
	<script src="https://js.stripe.com/v3/"></script>
</svelte:head>

<H1 id="title">{data.title}</H1>
<p>
	{data.description}
</p>
<LinkButton directive="primary" href="#donations">Donate</LinkButton>
<section>
	TODO
	<H2 id="progress">Progress</H2>
	<progress value="50" />
</section>
<section>
	<H2 id="q-and-a">Q & A</H2>
	<Stack>
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
			{#if $page.status === 200 && form?.anotherQuestionForm}
				<Alert title="Success" directive="success">
					Message sent by {form.anotherQuestionForm.data.email}</Alert
				>
			{:else}
				<form method="POST" action="?/anotherQuestion" use:enhance>
					<Stack>
						<Input
							label="Email"
							type="email"
							name="email"
							error={form?.anotherQuestionForm.errors.email}
							placeholder="someone@email.com"
							bind:value={$anotherQuestionForm.email}
							{...$anotherFormConstraints.email}
						/>
						<TextArea
							label="Message"
							name="message"
							error={form?.anotherQuestionForm.errors.message}
							placeholder="I have a question..."
							bind:value={$anotherQuestionForm.message}
							{...$anotherFormConstraints.message}
						/>
						<Button type="submit" directive="primary">Submit</Button>
					</Stack>
				</form>
			{/if}
		{/if}
	</Stack>
</section>
<section>
	<H2 id="donations">Donations</H2>
</section>
