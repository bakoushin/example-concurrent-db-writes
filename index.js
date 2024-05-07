const { spawn } = require('child_process');
const numProcesses = 10;

for (let i = 0; i < numProcesses; i++) {
  const child = spawn('node', ['transaction.js']);
  child.stdout.on('data', (data) => {
    console.log(`Process ${i + 1} stdout: ${data.toString()}`);
  });
  child.stderr.on('data', (data) => {
    console.error(`Process ${i + 1} stderr: ${data.toString()}`);
  });
  child.on('exit', () => console.log(`Transaction ${i + 1} done`));
}

console.log(`${numProcesses} transactions spawned concurrently`);
