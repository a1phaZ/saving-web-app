/* eslint-disable */
const esModules = [
  '.*\\.mjs$', // .mjs files are always ESM so they need to be transformed always
  'flat/', // npm package "flat" is ESM-only from version 6
].join('|');

export default {
  displayName: 'webapp',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  coverageDirectory: '../../coverage/apps/webapp',
  coverageReporters: ['lcov', 'text', 'text-summary'],
  moduleNameMapper: { '^flat$': 'node_modules/flat/index.js' },
  transform: {
    '^.+\\.(ts|mjs|js|html)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$',
      },
    ],
  },
  transformIgnorePatterns: [`node_modules/(?!${esModules})`],
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
