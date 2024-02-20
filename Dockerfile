# Set up
FROM node:18-alpine3.16

# Timezone
ENV TZ=Asia/Seoul
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Node dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Build
COPY . .
RUN npm run build

# Start deploying server
EXPOSE 3000
CMD ["npm", "run", "start:prod"]