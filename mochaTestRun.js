/* eslint-disable no-shadow */
const fs = require('fs');
const Mocha = require('mocha');
const glob = require('glob');

const args = process.argv[2];
let testDir = '';

if (args) {
    if (args.includes('.spec.js')) {
        testDir = args;
    } else if (args[args.length - 1].indexOf('/') === -1) {
        testDir = `${process.argv[2]}/*.spec.js`;
    } else {
        testDir = `${process.argv[2]}*.spec.js`;
    }
} else {
    testDir = './test/specs/**/*.spec.js';
}

const mocha = new Mocha({
    diff: true,
    reporter: 'mochawesome',
    'reporter-options': [
        'reportFilename=mochawesome',
        'consoleReporter=spec',
    ],
    ui: 'bdd',
});

const files = glob.sync(testDir, {});

files.forEach((file) => {
    if (file.includes('.spec.js')) {
        mocha.addFile(file);
    }
});

mocha.run((failures) => {
    let execResult;
    process.exitCode = 0;

    if (failures) {
        execResult = {
            status: 'Failure',
            totalFailures: failures,
        };
    } else {
        execResult = {
            status: 'Success',
        };
    }

    const data = JSON.stringify(execResult);
    fs.writeFileSync('jenkinsResult.json', data);
});
