module.exports = {
  printWidth: 100,
  tabWidth: 2,
  singleQuote: false,
  trailingComma: "es5",
  semi: true,
  plugins: ["prettier-plugin-astro"],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
};
