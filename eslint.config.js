import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import astroEslintParser from 'astro-eslint-parser';
import astroPlugin from 'eslint-plugin-astro';

export default [
    // Configuración base de ESLint
    eslint.configs.recommended,

    // Configuración de TypeScript
    ...tseslint.configs.recommended,

    // Configuración de Astro
    ...astroPlugin.configs.recommended,

    // Configuración global
    {
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            parser: tseslint.parser,
            globals: {
                // Globals para navegador
                window: 'readonly',
                document: 'readonly',
                navigator: 'readonly',
                // Globals para Node.js (para archivos de configuración)
                process: 'readonly',
                console: 'readonly',
                module: 'readonly',
                require: 'readonly',
                __dirname: 'readonly',
                __filename: 'readonly',
                global: 'readonly',
            },
        },
        plugins: {
            '@typescript-eslint': tseslint.plugin,
        },
        rules: {
            'no-unused-vars': 'warn',
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/ban-ts-comment': 'warn',
            '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
            'no-console': ['warn', { allow: ['warn', 'error'] }],
            // Relajar algunas reglas para archivos de configuración
            '@typescript-eslint/no-require-imports': 'off',
            'no-undef': 'warn',
        },
    },

    // Configuración específica para archivos Astro
    {
        files: ['*.astro', '**/*.astro'],
        languageOptions: {
            parser: astroEslintParser,
            parserOptions: {
                parser: '@typescript-eslint/parser',
                extraFileExtensions: ['.astro'],
            },
        },
        rules: {
            'astro/no-set-html-directive': 'warn', // Cambiado a warn para JSON-LD
            'astro/no-unused-define-vars-in-style': 'warn',
            'astro/prefer-class-list-directive': 'warn',
        },
    },

    // Configuración específica para archivos TypeScript
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parser: tseslint.parser,
        },
    },

    // Configuración específica para archivos de configuración CommonJS
    {
        files: ['*.config.js', '*.config.cjs', 'tailwind.config.*', 'accessibility.config.*'],
        languageOptions: {
            sourceType: 'script', // CommonJS
            globals: {
                module: 'writable',
                exports: 'writable',
                require: 'readonly',
                process: 'readonly',
                console: 'readonly',
                __dirname: 'readonly',
                __filename: 'readonly',
            },
        },
        rules: {
            '@typescript-eslint/no-require-imports': 'off',
            'no-undef': 'off',
            'no-dupe-keys': 'error',
        },
    },

    // Configuración específica para archivos de tipos TypeScript
    {
        files: ['**/*.d.ts'],
        rules: {
            '@typescript-eslint/triple-slash-reference': 'off',
            '@typescript-eslint/no-wrapper-object-types': 'warn',
        },
    },

    // Ignorar directorios
    {
        ignores: [
            'dist/**/*',
            'node_modules/**/*',
            '.astro/**/*',
            'build/**/*',
        ],
    },
];
