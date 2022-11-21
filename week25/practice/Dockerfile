FROM node:14-slim

# Step 3.1 - Add working directory
WORKDIR /app
# Step 3.2 - Copy npm dependencies
COPY package-lock.json /app/package-lock.json
COPY package.json /app/package.json
# Step 3.3 - Install dependencies
RUN npm install
# Copy app source code

COPY . .

#Expose port and start the application
# docker run --name my-first-redis -p 6379:6379 -d redis:4.0.1
EXPOSE 3000

CMD ["npm", "start"]