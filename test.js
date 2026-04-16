const snappy = require('snappy');
const crypto = require('crypto');

const MB = 1024 * 1024;

function log(stage) {
  const m = process.memoryUsage();
  console.log(
    `${new Date().toISOString()} ${stage} rss=${(m.rss / MB).toFixed(1)}MiB heapUsed=${(m.heapUsed / MB).toFixed(1)}MiB external=${(m.external / MB).toFixed(1)}MiB`
  );
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  console.log('50MB x 20 iterations');
  log('startup');

  for (let i = 1; i <= 20; i += 1) {
    const input = crypto.randomBytes(50 * MB);
    const compressed = await snappy.compress(input);
    const output = await snappy.uncompress(compressed);

    if (!output.equals(input)) {
      throw new Error(`bad round trip at iteration ${i}`);
    }

    if (global.gc) {
      global.gc();
    }

    log(`iteration=${i}`);
  }

  log('after-loop');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
