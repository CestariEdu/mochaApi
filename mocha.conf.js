module.exports = {
    diff: true,
    extension: ['js'],
    package: './package.json',
    reporter: 'mochawesome',
    'reporter-options': [
        'reportFilename=mochawesome',
        'consoleReporter=spec',
    ],
    slow: 75,
    timeout: 30000,
    spec: './test/specs/*/*.spec.js',
    file: './test/helpers',
    ui: 'bdd',
};
