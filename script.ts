const buff = new Uint8Array(2048);
await Deno.stdin.read(buff);
Deno.stdout.write(buff);