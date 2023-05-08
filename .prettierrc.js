module.exports = {
    bracketSpacing: true,
    jsxBracketSameLine: false,
    singleQuote: true,
    trailingComma: 'all',
    tabWidth: 4,
    arrowParens: 'always',
    printWidth: 120,
    jsxSingleQuote: false,
    overrides: [
        {
            files: ['*.yaml', '*.yml'],
            options: {
                tabWidth: 2,
            },
        },
    ],
};
