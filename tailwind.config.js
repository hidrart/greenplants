module.exports = {
	content: ['./views/**/*.{ejs, html, js}'],
	theme: {
		extend: {
			colors: {
				greenplant: '#1ec580',
			},
			fontFamily: {
				title: ['Patua One', 'cursive'],
				body: ['Open Sans', 'sans-serif'],
			},
		},
	},
	plugins: [require('@tailwindcss/forms')],
};
