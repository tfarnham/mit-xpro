FROM node:14-slim

# Step 4.1 - Add container working directory
WORKDIR /appserver
# Step 4.2 - Copy npm dependencies
COPY package-lock.json /appserver/package-lock.json
COPY package.json /appserver/package.json
# Step 4.3 - Install dependencies
RUN npm install
# Copy app source code

COPY . .

#Expose port and start application

EXPOSE 1337

CMD ["npm", "run", "develop"]