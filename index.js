const fs = require('fs');
const childProcess = require('child_process');
const http = require('http');


const server = http.createServer((req, res) => {
  fs.readFile('./script.ts', (err, file) => {
    res.statusCode = 200;
    res.setHeader("content-type", "application/typescript");
    res.write(file);
    res.end()
  });
}).listen(0, 'localhost', function () {
  const { address, port } = server.address();
  const SCRIPT_URL = `http://${address}:${port}`
  process.on("beforeExit", () => server.close());
  process.emit("serverReady", SCRIPT_URL);
})

process.on("serverReady", url => {
  console.log(url);
  const script = childProcess.spawn('deno', ['run', url + "/group/user"], { stdio: 'pipe' });
  script.on('exit', () => process.exit(0));
  script.stdout.pipe(process.stdout);
  script.stderr.pipe(process.stderr);
  script.stdin.write("HAHAHAHAHA\0");
});
