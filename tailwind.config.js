import tailwind from 'tailwindcss-primeui';

export default {
  content: ['./src/**/*.{html,js}'],
  plugins: [tailwind],
  theme: {
    extend: {
      height: {
        100: '30rem',
        128: '40rem',
      },
    },
  },
};
