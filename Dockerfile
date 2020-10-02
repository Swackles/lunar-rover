FROM node:14-alpine AS build
WORKDIR /lunar-rover

COPY package*.json /lunar-rover/
RUN npm ci

COPY tsconfig.json /lunar-rover/
COPY src /lunar-rover/src/
RUN npm run build

RUN env

RUN npm ci --production

FROM alpine:3
RUN apk add nodejs bash --no-cache
WORKDIR /lunar-rover

RUN env

COPY --from=build /lunar-rover/node_modules /lunar-rover/node_modules
COPY --from=build /lunar-rover/built /lunar-rover/

CMD node index.js