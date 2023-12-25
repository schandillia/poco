# Use the official Node.js image as the base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the dependencies using pnpm
RUN npm install -g pnpm@8.12.1
RUN pnpm install -P

# Copy the rest of the files to the working directory
COPY . .

# Build the Next.js project
RUN pnpm build

# Expose port 3000 from the container
EXPOSE 3000

# Start the Next.js server
CMD ["pnpm", "start"]