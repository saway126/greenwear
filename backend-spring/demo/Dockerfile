# Use OpenJDK 17 as base image
FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Copy gradle files
COPY gradle/ gradle/
COPY gradlew .
COPY build.gradle .
COPY settings.gradle .

# Make gradlew executable
RUN chmod +x gradlew

# Download dependencies
RUN ./gradlew dependencies --no-daemon

# Copy source code
COPY src/ src/

    # Build the application (skip tests for deployment)
    RUN ./gradlew build --no-daemon -x test

# Expose port
EXPOSE 8080

# Run the application
CMD ["java", "-jar", "build/libs/demo-1.0.0.jar"]