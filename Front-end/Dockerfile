# Use a light version of Node as a base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies using Yarn
RUN yarn install --frozen-lockfile

# Copy the rest of your app's source code
COPY . .

# Build your app
RUN yarn build

# Expose the port the app runs on
EXPOSE 3000

# Serve the app using `vite preview` (Consider using a more robust server for production)
CMD ["yarn", "preview"]
