# server/Dockerfile

# 1. Base Image: Use a minimal Node.js image
FROM node:20-slim

# 2. Set the working directory inside the container
WORKDIR /usr/src/app

# 3. Copy package files and install dependencies
# We copy these first to leverage Docker's caching
COPY package*.json ./
RUN npm install --production

# 4. Copy the entire source code (all files in the server/ folder)
COPY . .

# 5. Expose the port the app runs on (matching your PORT=4000 in .env)
EXPOSE 4000

# 6. Define the command to start the application
# This is equivalent to 'node src/index.js' run from the server/ root
CMD ["node", "src/index.js"]