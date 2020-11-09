/* eslint-disable no-shadow */
const fs = require('fs');
const path = require('path');
const Mocha = require('mocha');
const glob = require('glob');
const testDir = process.argv[2] ? process.argv[2] : './test/specs/**/*.spec.js';

const mocha = new Mocha({
    diff: true,
    reporter: 'mochawesome',
    'reporter-options': [
        'reportFilename=mochawesome',
        'consoleReporter=progress',
    ],
    ui: 'bdd'
});


const files = glob.sync(testDir, {});

files.forEach(file => {
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