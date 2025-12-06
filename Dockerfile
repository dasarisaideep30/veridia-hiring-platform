# server/Dockerfile - OPTIMIZED FOR CACHING AND NATIVE MODULES

# 1. Base Image
FROM node:20-slim

# 2. Install Build Tools (CRUCIAL for sqlite3 compilation)
# This layer installs tools for C++ compilation needed for native modules.
RUN apt-get update && apt-get install -y build-essential python3

# 3. Set the working directory
WORKDIR /usr/src/app

# --- CACHING LAYER ---
# 4. Copy ONLY package files (speeds up builds if dependencies haven't changed)
COPY package*.json ./ 

# 5. Install dependencies (This is only re-run if package.json changes)
RUN npm install --production

# --- APPLICATION LAYER ---
# 6. Copy ALL source code (This is re-run frequently, but npm install uses cache)
COPY . .

# 7. Expose the port
EXPOSE 4000

# 8. Define the command to start
CMD ["node", "src/index.js"]