FROM ghcr.io/usepa/node-20:latest

# Set the working directory inside the container
WORKDIR /ccd-ui/

# Set maximum heap size for Node.js
ENV NODE_OPTIONS="--max_old_space_size=4096"

# Copy all application files to the working directory
COPY . .
 
# Use bash as the shell for the following RUN commands
SHELL ["bash", "-c"]

# Install pnpm globally
RUN npm install -g pnpm \
   # Install dependencies using pnpm
   && pnpm install --ignore-scripts \
   # Update nuxt.config.ts to listen on all network interfaces
   && sed -i "s/host: 'localhost',/host: '0.0.0.0',/" nuxt.config.ts \
   && pnpm build
   
EXPOSE 8002

# Start the application in development mode using pnpm
#CMD ["pnpm", "dev"]
CMD ["pnpm", "start"]
