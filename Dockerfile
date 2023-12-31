# Use the official Ubuntu 22.04 image as the base image
FROM ubuntu:22.04

# Install curl and use it to download a nodesource executable
RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_20.x -o nodesource_setup.sh

# Make nodesource executable, then execute it to prepare for Node installation
RUN chmod a+x nodesource_setup.sh
RUN ./nodesource_setup.sh

# Install Node
RUN apt install nodejs -y

# Install pnpm globally
RUN npm install -g pnpm

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Copy the rest of the files to the working directory
COPY . .

# Install dependencies using pnpm
RUN pnpm install

# Generate Prisma Client
RUN npx prisma db push
RUN npx prisma generate

# Build application
RUN pnpm build

# Expose port 3000 from the container
EXPOSE 3000

# Start the Next.js server
CMD ["pnpm", "start"]