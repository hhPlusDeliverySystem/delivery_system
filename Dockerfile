# Install Dependencies

FROM node:18 AS install-dependencies
RUN mkdir -p /var/app
WORKDIR /var/app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .

# Creating Build
FROM node:18 AS create-build
WORKDIR /var/app
COPY --from=install-dependencies /var/app ./
RUN npm run build

# Run Application
FROM node:18 AS run
WORKDIR /var/app
COPY --from=install-dependencies /var/app/node_modules ./node_modules
COPY --from=create-build /var/app/dist ./dist
COPY package.json ./
RUN npm prune --production
EXPOSE 3000
CMD [ "node", "dist/main.js" ]
