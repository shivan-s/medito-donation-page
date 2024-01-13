import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const title = 'Title';
	const description =
		'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.';
	const questionAnswers: { question: string; answer: string }[] = [
		{
			question: 'Q1',
			answer: 'A1'
		},
		{
			question: 'Q2',
			answer: 'A2'
		}
	];
	return {
		title,
		description,
		questionAnswers
	};
};
