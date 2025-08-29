# Overview

GreenWear is a multi-project collection featuring 6 independent web applications, with the "Blog Promotion Generator" being the main completed project. The system combines Vue.js frontend with Spring Boot backend to create AI-powered content generation tools. The primary application allows users to generate blog promotional content using AI, with features for SEO optimization, sentiment analysis, and content management.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Vue 5.1.73** with TypeScript and Composition API for reactive UI components
- **Tailwind CSS** for utility-first styling and responsive design
- **Vite** as the build tool for fast development and optimized production builds
- **Vue Router** for single-page application routing and navigation
- **Chart.js** integration for data visualization and analytics

## Backend Architecture
- **Spring Boot 3** RESTful API server with 16 endpoints for content management
- **Spring Security** with JWT-based authentication and authorization
- **Spring Data JPA** for object-relational mapping and database interactions
- **H2 Database** for development and testing (configurable for production databases)
- **Lombok** for reducing boilerplate code in Java entities

## Data Storage
- **H2 In-Memory Database** as default for rapid development and testing
- **JPA/Hibernate** for database abstraction and migration support
- Configurable for **PostgreSQL** in production environments
- Entity models for users, blog posts, templates, and analytics data

## Content Generation System
- **AI Integration** for automated blog content creation based on keywords and categories
- **SEO Analysis Engine** that calculates scores and provides optimization suggestions
- **Sentiment Analysis** for emotional tone detection and visualization
- **Template System** with predefined formats for different content types
- **Real-time Analytics** for word count, reading time, and engagement metrics

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
- **Vue 5.1.73** - Progressive JavaScript framework for building user interfaces
- **Spring Boot 3** - Java-based framework for building production-ready applications
- **TypeScript** - Type-safe JavaScript development
- **Tailwind CSS** - Utility-first CSS framework

## Database & ORM
- **H2 Database** - In-memory database for development (production-ready alternatives supported)
- **Spring Data JPA** - Data persistence abstraction layer
- **Hibernate** - ORM implementation

## Build & Development Tools
- **Vite** - Frontend build tool and development server
- **Maven/Gradle** - Backend dependency management and build automation
- **Axios** - HTTP client for API communication
- **Vue Router** - Client-side routing solution

## Visualization & UI
- **Chart.js** - Data visualization library for analytics dashboards
- **Vue-ChartJS** - Vue.js wrapper for Chart.js integration
- **Heroicons** - Icon set for user interface elements

## Deployment Platforms
- **Vercel** - Frontend hosting with serverless API functions
- **Netlify** - Static site hosting with edge functions
- **Railway** - Full-stack application deployment
- **Render** - Cloud platform for web applications

## Development Dependencies
- **Vue TSC** - TypeScript compiler for Vue components
- **PostCSS & Autoprefixer** - CSS processing and browser compatibility
- **ESLint & Prettier** - Code quality and formatting tools