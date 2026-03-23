# # Build stage
# FROM node:18 AS build

# WORKDIR /app

# COPY package*.json ./
# RUN npm install

# COPY . .

# RUN npm run build

# # Production stage
# FROM nginx:alpine

# # Remove default config
# RUN rm /etc/nginx/conf.d/default.conf

# # Copy custom nginx config
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# # Copy built app
# COPY --from=build /app/dist /usr/share/nginx/html

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"] 
FROM node:18 AS build

WORKDIR /app

# Accept build argument
ARG VITE_BASE_URL=/
ENV VITE_BASE_URL=$VITE_BASE_URL

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Production stage
FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]