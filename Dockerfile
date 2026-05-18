FROM node:jod-alpine3.23 AS BUILD

WORKDIR /app

COPY .env.local package.json .prettierrc eslint.config.mjs nest-cli.json tsconfig.build.json tsconfig.json ./
COPY src .
# COPY test ./test

RUN npm i

CMD ["npm", "run", "build"]

FROM node:jod-alpine3.23 AS RUN

EXPOSE 3333

CMD ["npm", "run", "start:local"]
