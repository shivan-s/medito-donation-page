import type { Actions, PageServerLoad } from './$types';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import { fail } from '@sveltejs/kit';

const AnotherQuestionSchema = z.object({
	email: z.string({ required_error: 'Email is required' }).email().trim(),
	message: z.string({ required_error: 'Message is required' }).min(1).max(5000).trim()
});

export const load: PageServerLoad = async () => {
	const title = 'Title';
	const description =
		'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.';
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
	return {
		title,
		description,
		questionAnswers,
		anotherQuestionForm
	};
};

export const actions = {
	anotherQuestion: async ({ request }) => {
		const form = await superValidate(request, AnotherQuestionSchema);
		console.log('POST', form);

		if (!form.valid) {
			return fail(400, { anotherQuestionForm: form });
		}
		return { anotherQuestionForm: form };
	}
} satisfies Actions;
