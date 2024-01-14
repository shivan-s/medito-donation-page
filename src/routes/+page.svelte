<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import Alert from '$components/Alert.svelte';
	import Button from '$components/Button.svelte';
	import H1 from '$components/H1.svelte';
	import H2 from '$components/H2.svelte';
	import Input from '$components/Input.svelte';
	import LinkButton from '$components/LinkButton.svelte';
	import Select from '$components/Select.svelte';
	import Stack from '$components/Stack.svelte';
	import TextArea from '$components/TextArea.svelte';
	import type { PageData, ActionData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import PaymentForm from './PaymentForm.svelte';

	export let data: PageData;
	export let form: ActionData;

	console.log('data', data);
	console.log('form', form);

	$: questionAnswersIdx = -1;
	const { form: anotherQuestionForm, constraints: anotherQuestionConstraints } = superForm(
		data.anotherQuestionForm
	);
	$: anotherQuestionLoading = false;

	const { form: paymentIntentForm, constraints: paymentIntentConstraints } = superForm(
		data.paymentIntentForm
	);

	$: paymentIntentLoading = false;
</script>

<H1 id="title">{data.title}</H1>
<p>
	{data.description}
</p>
<LinkButton directive="primary" href="#donate">Donate</LinkButton>
<section>
	<H2 id="progress">Progress</H2>
	TODO
	<progress value="50" />
</section>
<section>
	<H2 id="q-and-a">Q & A</H2>
	<Stack>
		<Select label="FAQs" bind:value={questionAnswersIdx}>
			<option value={-1}>Choose a question</option>
			{#each data.questionAnswers as questionAnswer, idx}
				<option value={idx}>
					{questionAnswer.question}
				</option>
			{/each}
			<option value={-2}>Other</option>
		</Select>
		{#if data.questionAnswers[questionAnswersIdx]}
			<p>{data.questionAnswers[questionAnswersIdx].answer}</p>
		{:else if questionAnswersIdx === -2}
			{#if !form?.anotherQuestionForm || form?.anotherQuestionForm.valid === false}
				<form
					method="POST"
					action="?/anotherQuestion"
					use:enhance={() => {
						anotherQuestionLoading = true;
						return async ({ update }) => {
							await update();
							anotherQuestionLoading = false;
						};
					}}
				>
					<Stack>
						<p>Please submit your question along with your email.</p>
						<Input
							label="Email"
							type="email"
							name="email"
							error={form?.anotherQuestionForm?.errors.email}
							placeholder="your@email.com"
							bind:value={$anotherQuestionForm.email}
							{...$anotherQuestionConstraints.email}
						/>
						<TextArea
							label="Message"
							name="message"
							error={form?.anotherQuestionForm?.errors.message}
							placeholder="I have a question..."
							bind:value={$anotherQuestionForm.message}
							{...$anotherQuestionConstraints.message}
						/>
						<Button loading={anotherQuestionLoading} type="submit" directive="primary"
							>Submit</Button
						>
					</Stack>
				</form>
			{:else if form.anotherQuestionForm.valid}
				<Alert title="Success" directive="success">
					Message sent by {form.anotherQuestionForm.data.email}</Alert
				>
			{/if}
		{/if}
	</Stack>
</section>
<section>
	<H2 id="donate">Donate</H2>
	{#if !form?.paymentIntentForm}
		<form
			method="POST"
			action="?/paymentIntent"
			use:enhance={() => {
				paymentIntentLoading = true;
				return async ({ update }) => {
					await update();
					paymentIntentLoading = false;
				};
			}}
		>
			<Stack>
				<Select name="currency" value={$paymentIntentForm.currency} label="Currency"
					>{#each data.currencies as currency}
						<option value={currency.code}
							>{currency.flag}
							{currency.symbol}
							{currency.name}</option
						>
					{/each}</Select
				><Input
					name="amount"
					value={$paymentIntentForm.amount}
					error={form?.paymentIntentForm?.errors.amount}
					{...$paymentIntentConstraints.amount}
					label="Amount"
				/>
				<Button loading={paymentIntentLoading} type="submit" directive="primary">Donate</Button>
			</Stack>
		</form>
	{:else if form.paymentIntentForm.valid}
		<PaymentForm clientSecret={form.clientSecret ?? ''} />
	{/if}
</section>
