# server/Dockerfile - CORRECTED FOR NATIVE MODULES LIKE SQLITE3

# 1. Base Image: Use a minimal Node.js image
FROM node:20-slim

# 2. Set the working directory inside the container
WORKDIR /usr/src/app

# 3. Copy ALL files (including source code and package files)
# We need src/ and package.json available for the install step
COPY . .

# 4. Install dependencies (this will re-compile sqlite3 for the Linux environment)
# Use --production since we only need runtime dependencies
RUN npm install --production

# 5. Expose the port the app runs on
EXPOSE 4000

# 6. Define the command to start the application
CMD ["node", "src/index.js"]