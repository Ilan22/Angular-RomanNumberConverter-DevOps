FROM node:20-alpine

WORKDIR /app

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Expose port 4200
EXPOSE 4200

# Start the app with ng serve, allowing external connections
CMD ["ng", "serve", "--host", "0.0.0.0"]
