# pull official base image
FROM node:alpine
RUN apk update && apk upgrade

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json /app/
COPY package-lock.json /app/
RUN npm install 
RUN npm install react-scripts@3.4.1 -g --silent

# add app
COPY . /app/

# start app
CMD ["npm", "start"]