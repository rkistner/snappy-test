# Snappy memory leak

This demonstrates a memory leak on snappy 7.3.0 -> 7.3.3.

The test script just runs 20x iterations of compressing a random 50MB blob, then decompressing it again.

Testing direct build:

```sh
npm install
node --expose-gc test.js
```

Specifically watch for the rss value. Hovering between 200-300MiB is fine. Growing to 2000MiB or more is a clear indication of memory leak.

Running in Docker to test different setups:
1. Modify package.json to indicate a specific snappy version.
2. Modify Dockerfile to indicate a specific NodeJS image.
3. `docker build . -t snappy && docker run snappy`


## Test results

```
node:24, snappy@7.3.3: 2348MiB RSS
node:24, snappy@7.2.2: 264MiB RSS
node:24-alpine, snappy@7.3.3: 255MiB RSS
```
