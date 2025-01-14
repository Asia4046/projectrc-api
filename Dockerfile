FROM node:21

RUN useradd -u 8877 10000 

RUN groupadd docker

RUN usermod -aG docker 10000 

USER 10000 

WORKDIR /home/10000/projrc

COPY . .

RUN yarn 

EXPOSE 3000

RUN yarn build

RUN yarn prisma migrate deploy

CMD ["yarn", "run", "start:prod"]