FROM node:21

RUN useradd -u 8877 dev

RUN sudo groupadd docker

RUN sudo usermod -aG docker dev

USER dev

WORKDIR /usr/src/projrc

COPY . .

RUN yarn 

EXPOSE 3000

RUN yarn build

RUN yarn prisma migrate deploy

CMD ["yarn", "run", "start:prod"]