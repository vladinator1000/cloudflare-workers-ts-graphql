FROM node:17-alpine
WORKDIR '/prismaProxy'
COPY ./ ./
RUN npm install
# Bypass this error by specifying a cache location [Error: EACCES: permission denied, scandir '/root/.npm/_logs']
CMD ["npm", "run", "--cache", "/var/cache/", "watch-proxy"]