# base image
FROM node:16-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json yarn.lock /app/
RUN yarn

# add app
COPY . /app

CMD npx nx serve host-app --host=0.0.0.0