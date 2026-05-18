FROM Node.js:26-alpine3.23-dev AS BUILD

WORKDIR /app

COPY .env.local .
COPY src ./src
COPY test ./test

RUN npm i

CMD ["npm", "run", "build"]

FROM Node.js:26-alpine3.23-dev AS RUN

EXPOSE 3333

CMD ["npm", "run", "start:local"]
