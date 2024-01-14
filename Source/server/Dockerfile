FROM node:20.10.0

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/

# RUN apk --no-cache add --virtual builds-deps build-base python3x
RUN npm install
RUN npm rebuild bcrypt --build-from-source
# RUN npm cache clean --force

COPY . /usr/src/app
RUN npm run build

EXPOSE 8080
CMD [ "npm", "start" ]