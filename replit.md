# Overview

GreenWear is a comprehensive IoT-enabled sustainable fashion e-commerce platform specifically designed for medical professionals and military personnel. The system features real-time health monitoring through ESP32-based smart textiles, professional-grade certifications, and eco-friendly materials. The platform combines Vue.js frontend with Spring Boot backend to deliver a complete smart wearable ecosystem with 3D clothing visualization, real-time biometric monitoring, and professional equipment management.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Vue 3** with TypeScript and Composition API for reactive UI components
- **Tailwind CSS** for utility-first styling and responsive design
- **Vite** as the build tool for fast development and optimized production builds
- **Vue Router** for single-page application routing and navigation
- **Chart.js** integration for data visualization and analytics
- **3D SVG Modeling** for interactive clothing visualization
- **Bluetooth Web API** for real-time wearable device connectivity

## Backend Architecture
- **Spring Boot 3** RESTful API server with IoT endpoints for wearable data collection
- **Spring Security** with JWT-based authentication and authorization
- **Spring Data JPA** for object-relational mapping and database interactions
- **H2 Database** for development and testing (configurable for production databases)
- **IoT Data Processing** for real-time sensor data analysis and health monitoring

## Data Storage
- **H2 In-Memory Database** as default for rapid development and testing
- **JPA/Hibernate** for database abstraction and migration support
- Configurable for **PostgreSQL** in production environments
- Entity models for users, products, wearable data, and health analytics
- **WearableData Entity** for storing sensor readings (heart rate, temperature, SpO2, etc.)

## IoT Wearable System
- **ESP32 Microcontroller** based smart textile integration
- **Real-time Sensor Data Collection** (ECG, temperature, motion, SpO2)
- **Bluetooth LE** communication for low-power wireless connectivity
- **AI-powered Health Analysis** for anomaly detection and alerts
- **3D Clothing Visualization** with sensor position mapping
- **Medical/Military Grade Accuracy** (±1 BPM, ±0.1°C precision)

## API Design
- RESTful architecture with clear resource-based endpoints
- CORS configuration for cross-origin requests
- Error handling with standardized response formats
- Request/response validation and transformation layers
- Pagination and filtering support for content lists

## Deployment Strategy
- **Multi-platform deployment** support (Vercel, Netlify, Railway, Render)
- **Serverless functions** for API endpoints on platforms like Vercel
- **Static site generation** for frontend with dynamic API integration
- **Environment-based configuration** for different deployment targets

# External Dependencies

## Core Technologies
- **Vue 3** - Progressive JavaScript framework for building user interfaces
- **Spring Boot 3** - Java-based framework for building production-ready applications
- **TypeScript** - Type-safe JavaScript development
- **Tailwind CSS** - Utility-first CSS framework
- **ESP32** - Dual-core microcontroller for IoT sensor integration

## Database & ORM
- **H2 Database** - In-memory database for development (production-ready alternatives supported)
- **Spring Data JPA** - Data persistence abstraction layer
- **Hibernate** - ORM implementation
- **WearableData Repository** - Specialized repository for sensor data management

## Build & Development Tools
- **Vite** - Frontend build tool and development server
- **Gradle** - Backend dependency management and build automation
- **Axios** - HTTP client for API communication
- **Vue Router** - Client-side routing solution

## Visualization & UI
- **Chart.js** - Data visualization library for analytics dashboards
- **Vue-ChartJS** - Vue.js wrapper for Chart.js integration
- **3D SVG Modeling** - Interactive clothing visualization
- **Bluetooth Web API** - Real-time device connectivity

## Deployment Platforms
- **Vercel** - Frontend hosting with serverless API functions
- **Netlify** - Static site hosting with edge functions
- **Railway** - Full-stack application deployment
- **Render** - Cloud platform for web applications

## Development Dependencies
- **Vue TSC** - TypeScript compiler for Vue components
- **PostCSS & Autoprefixer** - CSS processing and browser compatibility
- **ESLint & Prettier** - Code quality and formatting tools