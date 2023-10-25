# Install dependencies only when needed - Dependencies installation stage
FROM node:18-alpine as deps-installer

WORKDIR /app
COPY package* ./
# Install dependencies (npm i --only=production makes sure the exact versions in the lockfile gets installed)
RUN npm i --only=production

# This is builder stage to build source codes
FROM node:18-alpine as builder

# Set the working directory to /app inside the container
WORKDIR /app

COPY . .

COPY --from=deps-installer /app/node_modules ./node_modules

# Put in env for build
COPY .env.prod .env


# Build the app
RUN npm run build

# This is runner stage
# Bundle static assets with nginx
FROM nginx:stable-alpine as runner
# Creator
LABEL author="Minh Nguyen"
LABEL maintainer="Minh Nguyen"
LABEL alias="BugFixWanderer"
LABEL email="nca.minh8897@gmail.com"
LABEL linkedln="https://www.linkedin.com/in/cuong-anh-minh-nguyen/"
LABEL youtube="https://www.youtube.com/channel/UCRUJYpLa_nQrR6NY5Uy6egQ"

# Copy built assets from `builder` image
COPY --from=builder /app/build /usr/share/nginx/html

# Add your nginx.conf
COPY --from=builder /app/nginx/react-proxy.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

# Start nginx
CMD ["nginx", "-g", "daemon off;"]