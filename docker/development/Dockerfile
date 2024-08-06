FROM node:20.12.0-alpine

RUN apk --no-cache add netcat-openbsd wget \
    && wget -q -O /usr/bin/wait-for https://raw.githubusercontent.com/eficode/wait-for/v2.2.3/wait-for \
    && chmod +x /usr/bin/wait-for

RUN npm i -g @nestjs/cli

WORKDIR /usr/app/api/

COPY ../../package.json .
RUN yarn install

COPY ../. .

EXPOSE 3000