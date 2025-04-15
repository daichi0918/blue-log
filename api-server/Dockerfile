FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Install necessary dependencies for Prisma
RUN apk add --no-cache \
  openssl \
  musl-dev \
  libc6-compat

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the prisma directory
COPY prisma ./prisma

# Generate Prisma Client for musl environment
RUN npx prisma generate

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start:dev"]
