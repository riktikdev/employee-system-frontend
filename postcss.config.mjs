const config = {
  plugins: {
    '@tailwindcss/postcss': {},
    ...(import.meta.env === 'production' ? { cssnano: {} } : {}),
  },
};

export default config;
