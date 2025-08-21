import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends(
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:tailwindcss/recommended',
    'prettier'
  ),
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
    rules: {
      // 빈 줄 규칙 비활성화
      'padding-line-between-statements': 'off',
      // 일관된 들여쓰기를 강제
      indent: [
        'warn',
        2,
        {
          SwitchCase: 1,
          ignoredNodes: ['TemplateLiteral > *', 'ConditionalExpression > *'],
        },
      ],
      // 함수 호출 시 일관된 괄호 간격
      'function-call-argument-newline': ['error', 'consistent'],
      // React props에서 객체 spread 허용
      'react/jsx-props-no-spreading': 'off',
      // React 17+ 사용 시 React import 생략 가능
      'react/react-in-jsx-scope': 'off',
      // 사용하지 않는 변수는 경고로 처리
      'no-unused-vars': 'warn',
      // TypeScript에서 타입 지정 강제
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      // 임시로 any 타입 허용 (점진적으로 제거 권장)
      '@typescript-eslint/no-explicit-any': 'warn',
      // 표현식만 있는 화살표 함수에서 중괄호 불필요
      'arrow-body-style': ['warn', 'as-needed'],
      // Tailwind CSS 관련 규칙
      'tailwindcss/classnames-order': 'warn',
      'tailwindcss/no-custom-classname': [
        'warn',
        {
          whitelist: ['typo-.*', 'cn-.*'],
        },
      ],
      'tailwindcss/no-contradicting-classname': 'warn',
      // TypeScript 타입 정의에서 사용되는 변수명 무시
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_|^e$|^event$|^props$|^on[A-Z].*|^set[A-Z].*',
          varsIgnorePattern: '^_|[iI]gnored|[tT]ype',
          ignoreRestSiblings: true,
        },
      ],
      // TypeScript 사용 시 prop-types 검증 비활성화
      'react/prop-types': 'off',
      'unused-imports/no-unused-imports': 'error',
    },
  },
  {
    settings: {
      react: {
        version: 'detect',
      },
      tailwindcss: {
        config: 'tailwind.config.ts',
        cssFiles: ['**/*.css', '**/*.scss', '!**/node_modules/**'],
        classRegex: '^class(Name)?$|^tw$',
      },
    },
  },
]

export default eslintConfig
