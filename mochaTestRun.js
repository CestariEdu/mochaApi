/* eslint-disable no-shadow */
const fs = require('fs');
const path = require('path');
const Mocha = require('mocha');

const mocha = new Mocha({
    diff: true,
    reporter: 'mochawesome',
    'reporter-options': [
        'reportFilename=mochawesome',
        'consoleReporter=spec',
    ],
    slow: 75,
    timeout: 30000,
    file: './test/helpers',
    ui: 'bdd',
});

const testDir = process.argv[2] ? `./test/specs/${process.argv[2]}` : './test/specs/';

if (process.argv[2]) {
    if (process.argv[2].includes('.spec.js')) {
        mocha.addFile(testDir);
    } else {
        fs.readdirSync(testDir).filter((file) => file.substr(-8) === '.spec.js').forEach((file) => {
            mocha.addFile(
                path.join(testDir, file),
            );
        });
    }
} else {
    fs.readdirSync(testDir).forEach((file) => {
        const dir = `${testDir}/${file}`;
        fs.readdirSync(dir).filter((file) => file.substr(-8) === '.spec.js').forEach((file) => {
            mocha.addFile(
                path.join(dir, file),
            );
        });
    });
}

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
            status: 'Succes',
        };
    }
    const data = JSON.stringify(execResult);
    fs.writeFileSync('jenkinsResult.json', data);
});
