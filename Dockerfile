# server/Dockerfile - FINAL FIX FOR SQLITE

# 1. Base Image: Use a minimal Node.js image
FROM node:20-slim

# 2. Set the working directory inside the container
WORKDIR /usr/src/app

# 3. Copy ALL files
COPY . .

# 4. Install dependencies (Crucial Step: Install Build Tools and Recompile)
# We install tools needed to compile native code (like sqlite3) in the Linux environment.
RUN apt-get update && apt-get install -y build-essential python3

# Now run npm install, which will correctly compile native modules
RUN npm install --production

# 5. Expose the port the app runs on
EXPOSE 4000

# 6. Define the command to start the application
CMD ["node", "src/index.js"]