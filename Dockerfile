FROM node:21

ARG USERNAME=a22
ARG USER_UID=1000
ARG USER_GID=$USER_UID

WORKDIR /usr/src/projrc

COPY . .

RUN yarn 

EXPOSE 3000

RUN yarn build

RUN yarn prisma migrate deploy

CMD ["yarn", "run", "start:prod"]