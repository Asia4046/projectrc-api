FROM node:21

USER 10014

WORKDIR /home/10014/projrc

COPY . .

RUN yarn 

EXPOSE 3000

RUN yarn build

RUN yarn prisma migrate deploy

CMD ["yarn", "run", "start:prod"]