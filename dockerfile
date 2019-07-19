# Use an official node runtime as a parent image
FROM node:latest

# Make a folder in our image where source code will live
RUN mkdir -p /src/app

# Set the working directory to /app
WORKDIR /src/app

# Copy the current directory contents into the container at /app
COPY . /src/app

# ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
# RUN chmod +x /wait
# Install any needed packages specified in package.json
RUN npm install

# Make port 3004 available to the world outside this container
EXPOSE 3000

# Run npm start when the container launches
CMD ["npm","start"]