module.exports = {
  'src/**/*.{ts,tsx}': ['eslint --fix', 'npx prettier --write'],
  'src/**/*.{js,jsx}': ['eslint --fix', 'npx prettier --write'],
  'src/**/*.less': ['stylelint --fix', 'npx prettier --write'],
  'src/**/*.css': ['stylelint --fix', 'npx prettier --write'],
}