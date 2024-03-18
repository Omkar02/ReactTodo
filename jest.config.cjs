module.exports = {
    testEnvironment: 'jsdom',
    preset: 'ts-jest/presets/js-with-babel',
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts|tsx)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
