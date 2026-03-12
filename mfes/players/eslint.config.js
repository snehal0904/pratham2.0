const { FlatCompat } = require('@eslint/eslintrc');
const js = require('@eslint/js');
const { fixupConfigRules } = require('@eslint/compat');
const nx = require('@nx/eslint-plugin');
const baseConfig = require('../../eslint.config.js');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

module.exports = [
  ...fixupConfigRules(compat.extends('next')),

  ...fixupConfigRules(compat.extends('next/core-web-vitals')),

  ...baseConfig,
  ...nx.configs['flat/react-typescript'],
  {
    ignores: [
      '.next/**/*',
      // public/ contains third-party static player assets (H5P libraries, etc.)
      // that ship their own .eslintrc files with incompatible configs.
      // ESLint must not scan them.
      'public/**/*',
    ],
  },
];
