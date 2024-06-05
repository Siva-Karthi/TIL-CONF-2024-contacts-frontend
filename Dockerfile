# Use a Node.js base image
FROM node:16-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
  # Or yarn install if using yarn
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the React application (adjust for your build command)
  # Or yarn build if using yarn
RUN npm run build

# Expose the port (default React port is 3000)
 # You can change this port if needed
EXPOSE 3000 

RUN npm install -g serve
# Command to run the web server
CMD ["serve", "-s", "build", "-l", "3000"]
# Serve the static files from the build output
# CMD ["nginx", "-g", "daemon off;"]


