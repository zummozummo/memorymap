FROM node:alpine

#The RUN command will be executed inside project.
WORKDIR /app

COPY package.json .
RUN npm install --only=prod 
COPY . .

CMD ["npm","start"]