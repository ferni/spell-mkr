#!/usr/bin/env node
const argv = process.argv;
const parameter = argv[2];
const value = argv[3];
const mkrParams = ['cap', 'mat', 'tax', 'fee', 'axe', 'tubGap', 'tapGap', 'way', 'how'];
const config = require('./config.json');

if (argv.length === 2 || argv[2] === '--help') {
  console.log(
    'Usage: spell <maker parameter> <value> [--publish]\n' +
    'Example: spell cap 50000000000000000000000000\n' +
    '\nMaker Parameters:\n' +
    '\t  cap : Debt ceiling\n' +
    '\t  mat : Liquidation ratio\n' +
    '\t  tax : Stability fee\n' +
    '\t  fee : Governance fee\n' +
    '\t  axe : Liquidation fee\n' +
    '\t  tubGap : Join/Exit Spread\n' +
    '\t  tapGap : Boom/Bust Spread\n' +
    '\t  way : Rate of change of target price (per second)\n'
  );
  process.exit();
}

if (!mkrParams.includes(parameter)) {
  throw 'Unrecognized parameter "' + parameter + "'. Call spell --help for a list of valid parameters.";
}

if (value === undefined) {
  throw 'No value specified for ' + parameter;
}

const { execSync } = require('child_process');
let chain = execSync('seth chain');
chain = chain.slice(0, chain.length - 1); // remove new line char
if (!config[chain]) {
  throw 'Chain ' + chain + ' not supported';
} else {
  console.log('Using Network: ' + chain);
}
const method = 'set' + parameter.charAt(0).toUpperCase() + parameter.slice(1);
const valueUint = execSync('seth --to-uint256 ' + value);
const calldata = execSync(`seth calldata '${method}(uint256)' ${valueUint}`);
console.log('Spell data: ' + calldata.toString());

if (argv[4] === '--publish') {
  const { spawn } = require('child_process');
  const command = `seth send ${config[chain].spellbook} 'make(address,uint256,bytes)' ${config[chain].mom} 0 ${calldata}`;
  console.log('> ' + command);
  spawn(command, {
    shell: true,
    stdio: 'inherit'
  });
} else {
  console.log('Add --publish at the end in order to create the spell on the blockchain.');
}
