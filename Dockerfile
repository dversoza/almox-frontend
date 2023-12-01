# Dockerfile for Angular app
FROM node:21.2-alpine3.18

WORKDIR /app
COPY . .

# Install dependencies
RUN npm install --legacy-peer-deps
RUN npm install -g @angular/cli

# Run the app
CMD ng serve --host 0.0.0.0 --port 4200
