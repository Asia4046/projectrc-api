FROM node:21

WORKDIR /usr/src/projrc

COPY . .

RUN yarn 

EXPOSE 3000

RUN yarn build

RUN yarn prisma migrate deploy

CMD ["yarn", "run", "start:prod"]