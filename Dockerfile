FROM node:24

WORKDIR /app

COPY package.json /app/package.json
RUN npm install
COPY test.js /app/test.js

CMD ["node", "--expose-gc", "/app/test.js"]
