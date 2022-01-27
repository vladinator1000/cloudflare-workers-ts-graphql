FROM node:17-alpine
WORKDIR '/prismaProxy'
COPY ./ ./
RUN npm install

CMD ["npm", "run", "--cache", "/var/cache/", "prisma-proxy"]