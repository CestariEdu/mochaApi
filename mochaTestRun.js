const Mocha = require('mocha');
const glob = require('glob');

const args = process.argv[2];
let testDir = '';

if (args) {
    if (args.includes('.spec.js')) {
        testDir = args;
    } else if (args[args.length - 1].indexOf('/') === -1) {
        testDir = `${process.argv[2]}*/**/*.spec.js`;
    } else {
        testDir = `${process.argv[2]}*.spec.js`;
    }
} else {
    testDir = './test/specs/**/**/*.spec.js';
}

const mocha = new Mocha({
    diff: true,
    reporter: 'mochawesome',
    'reporter-options': [
        'reportFilename=mochawesome',
        'consoleReporter=spec',
    ],
    ui: 'bdd',
    timeout: 70000,
});

const files = glob.sync(testDir, {});

files.forEach((file) => {
    if (file.includes('.spec.js')) {
        mocha.addFile(file);
    }
});

mocha.run((failure) => {
    if (failure) {
        process.exitCode = 1;
    }
});
