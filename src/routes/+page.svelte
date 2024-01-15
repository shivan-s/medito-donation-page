<script lang="ts">
	import { enhance } from '$app/forms';
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
	import Progress from '$components/Progress.svelte';
	import { currencyFormatter } from '$lib/client';
	import HStack from '$components/HStack.svelte';

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
<LinkButton title="Click to donate" directive="primary" href="#donate">Donate</LinkButton>
<section>
	<H2 id="progress">
		Donation Goal - <span class="progress">{currencyFormatter.format(data.goal)}</span>
	</H2>
	<Stack>
		<Progress title="Click to donate" href="#donate" progress={(data.progress / data.goal) * 100} />
		<p>
			So far <strong>{data.donationCount}</strong> individuals have donated
			<span class="progress">{currencyFormatter.format(data.progress)}</span>.
		</p>
	</Stack>
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
	<Stack>
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
				<p>Select currency and amount to domate</p>
				<Input
					name="name"
					disabled={form?.paymentIntentForm}
					value={$paymentIntentForm.name}
					error={form?.paymentIntentForm?.errors.name}
					{...$paymentIntentConstraints.name}
					label="Name"
					placeholder="Name (optional)">Name</Input
				>
				<HStack>
					<Select
						disabled={form?.paymentIntentForm}
						name="currency"
						value={$paymentIntentForm.currency}
						label="Currency"
						>{#each data.currencies as currency}
							<option title={currency.name} value={currency.code}
								>{currency.flag}
								{currency.symbol}
								{currency.code.toUpperCase()}</option
							>
						{/each}</Select
					><Input
						name="amount"
						disabled={form?.paymentIntentForm}
						value={$paymentIntentForm.amount}
						error={form?.paymentIntentForm?.errors.amount}
						{...$paymentIntentConstraints.amount}
						label="Amount"
					/>
				</HStack>
				<Button
					title="Proceed to payment method"
					disabled={form?.paymentIntentForm}
					loading={paymentIntentLoading}
					type="submit"
					directive="primary">Donate</Button
				>
			</Stack>
		</form>
		{#if form?.paymentIntentForm?.valid}
			<PaymentForm clientSecret={form.clientSecret ?? ''} />
		{/if}</Stack
	>
</section>

<style>
	.progress {
		font-weight: bold;
		color: var(--primary);
	}
</style>
