FROM node


WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 3333

CMD ["npm", "run", "dev"]