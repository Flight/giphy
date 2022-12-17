FROM node:18
WORKDIR /app
COPY package.json .
COPY pnpm-lock.yaml .
RUN npm install pnpm@7 -g && pnpm install
COPY . .
EXPOSE 5173 6006
CMD pnpm start:silent & pnpm storybook