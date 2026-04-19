import nextPlugin from '@next/eslint-plugin-next';
import { sheriff } from 'eslint-config-sheriff';

const sheriffOptions = {
  react: true,
  next: true,
  storybook: true,
  lodash: false,
  remeda: false,
  astro: false,
  playwright: false,
  jest: false,
  vitest: false,
};

const eslintConfig = [
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
    ],
  },
  {
    files: ['eslint.config.mjs'],
    plugins: {
      '@next/next': nextPlugin,
    },
  },
  ...sheriff(sheriffOptions),
  {
    files: ['**/*.{js,mjs,cjs,jsx,ts,tsx}'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      'react-hooks/exhaustive-deps': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@next/next/no-img-element': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },
];

export default eslintConfig;
