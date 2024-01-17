import type { Actions, PageServerLoad } from './$types';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import { fail } from '@sveltejs/kit';
import { stripe } from '$lib/server';

const AnotherQuestionSchema = z.object({
	email: z.string({ required_error: 'Email is required.' }).email().trim(),
	message: z
		.string({ required_error: 'Message is required.' })
		.min(10, { message: 'Message is too short. Must be more than 10 characters.' })
		.max(5000, { message: 'Message is too long. Must be less than 5000 characters.' })
		.trim()
});

const PaymentIntentSchema = z.object({
	name: z
		.string()
		.max(50, { message: 'Name is too long. Must be less than 50 characters' })
		.optional(),
	amount: z
		.number({ required_error: 'Amount is required.' })
		.min(1, { message: 'Amount is too low.' }),
	currency: z.union([
		z.literal('usd'),
		z.literal('gbp'),
		z.literal('inr'),
		z.literal('eur'),
		z.literal('aud'),
		z.literal('cad')
	])
});

export const load: PageServerLoad = async () => {
	// NOTE: title and description can be set here
	const title = 'Title';
	const description =
		'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.';

	const goal = 2000.5;
	const progress = 1000.222;
	const donationCount = 100;

	// NOTE: questions and answers can be set here
	const questionAnswers: { question: string; answer: string }[] = [
		{
			question: 'Q1 Lorem ipsum dolor sit?',
			answer: 'Answer 1'
		},
		{
			question: 'Q2 Lorem ipsum dolor?',
			answer: 'Answer 2'
		}
	];
	const anotherQuestionForm = await superValidate(AnotherQuestionSchema);

	const currencies: { name: string; code: string; flag: string; symbol: string }[] = [
		{ name: 'United States Dollar', code: 'usd', flag: '\u{1F1FA}\u{1F1F8}', symbol: '$' },
		{ name: 'British Pound', code: 'gbp', flag: '\u{1F1EC}\u{1F1E7}', symbol: '£' },
		{ name: 'Indian Rupee', code: 'inr', flag: '\u{1F1EE}\u{1F1F3}', symbol: '₹' },
		{ name: 'Euro', code: 'eur', flag: '\u{1F1EA}\u{1F1FA}', symbol: '€' },
		{ name: 'Australian Dollar', code: 'aud', flag: '\u{1F1E6}\u{1F1FA}', symbol: '$' },
		{ name: 'Canadian Dollar', code: 'cad', flag: '\u{1F1E8}\u{1F1E6}', symbol: 'C$' }
	];
	const paymentIntentForm = await superValidate(PaymentIntentSchema);

	return {
		title,
		description,

		goal,
		progress,
		donationCount,

		questionAnswers,
		anotherQuestionForm,

		currencies,
		paymentIntentForm
	};
};

export const actions = {
	anotherQuestion: async ({ request }) => {
		const form = await superValidate(request, AnotherQuestionSchema);

		if (!form.valid) {
			return fail(400, { anotherQuestionForm: form });
		}
		// NOTE: Add submission backend here for messages
		return { anotherQuestionForm: form };
	},
	paymentIntent: async ({ request }) => {
		const form = await superValidate(request, PaymentIntentSchema);

		if (!form.valid) {
			return fail(400, { paymentIntentForm: form });
		}
		const paymentIntent = await stripe.paymentIntents.create({
			amount: form.data.amount * 100,
			currency: form.data.currency
		});
		return {
			paymentIntentForm: form,
			clientSecret: paymentIntent.client_secret
		};
	}
} satisfies Actions;
