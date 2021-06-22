FROM node:alpine

RUN mkdir /app
WORKDIR /app

COPY package.json yarn.lock .eslintrc.js tsconfig.json tailwind.config.js craco.config.js ./
RUN yarn install 

COPY src src 
COPY public public 

CMD npm start