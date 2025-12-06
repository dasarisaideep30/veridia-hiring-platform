# server/Dockerfile - FINAL & OPTIMIZED FIX

# 1. Base Image
FROM node:20.12-slim

# 2. Install Build Tools (Necessary for sqlite3 compilation)
RUN apt-get update && apt-get install -y build-essential python3

# 3. Set the working directory
WORKDIR /usr/src/app

# --- Dependency Layer (Isolated for Caching) ---
# 4. Copy ONLY package files (NO source code yet)
COPY package*.json ./ 

# 5. Run npm install (Forces sqlite3 to compile correctly for Linux)
RUN npm install --production

# --- Application Layer ---
# 6. Copy ALL remaining source code (Applies over the installed node_modules)
COPY . .

# 7. Expose the port
EXPOSE 4000

# 8. Define the command to start
CMD ["node", "src/index.js"]