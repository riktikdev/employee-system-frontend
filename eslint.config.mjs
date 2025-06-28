import antfu from '@antfu/eslint-config';
import pluginTanstackQuery from '@tanstack/eslint-plugin-query';
import pluginTanstackRouter from '@tanstack/eslint-plugin-router';
import pluginReact from 'eslint-plugin-react';

const config = antfu(
  {
    typescript: true,
    stylistic: false,
    react: true,
    jsx: true,
  },
  {
    name: 'employee/react',
    plugins: {
      'employee-react': pluginReact,
    },
    rules: {
      ...Object.entries(pluginReact.configs.recommended.rules).reduce(
        (acc, [key, value]) => {
          acc[key.replace('react', 'employee-react')] = value;
          return acc;
        },
        {},
      ),
      'employee-react/prop-types': 'off',
      'employee-react/react-in-jsx-scope': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    name: 'employee/tanstack-query',
    plugins: {
      '@tanstack/query': pluginTanstackQuery,
    },
    rules: {
      ...pluginTanstackQuery.configs.recommended.rules,
      '@tanstack/query/exhaustive-deps': 'warn',
    },
  },
  {
    name: 'employee/tanstack-router',
    plugins: {
      '@tanstack/router': pluginTanstackRouter,
    },
    rules: {
      ...pluginTanstackRouter.configs.recommended.rules,
    },
  },
  {
    name: 'employee/rewrite',
    rules: {
      'antfu/curly': 'off',
      'antfu/if-newline': 'off',
      'antfu/top-level-function': 'off',
      'no-console': 'warn',
      'react-hooks/exhaustive-deps': 'off',
    },
  },
  {
    name: 'employee/sort',
    rules: {
      'perfectionist/sort-array-includes': [
        'error',
        {
          order: 'asc',
          type: 'alphabetical',
        },
      ],
      'perfectionist/sort-jsx-props': [
        'error',
        {
          customGroups: {
            callback: 'on*',
            reserved: ['key', 'ref'],
          },
          groups: ['shorthand', 'reserved', 'multiline', 'unknown', 'callback'],
          order: 'asc',
          type: 'alphabetical',
        },
      ],
      'perfectionist/sort-union-types': [
        'error',
        {
          groups: [
            'conditional',
            'function',
            'import',
            'intersection',
            'keyword',
            'literal',
            'named',
            'object',
            'operator',
            'tuple',
            'union',
            'nullish',
          ],
          order: 'asc',
          specialCharacters: 'keep',
          type: 'alphabetical',
        },
      ],
    },
  },
  {
    name: 'employee/generated',
    ignores: ['./generated'],
  },
);

export default config;
