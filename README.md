# Home Cleaning Frontend

A modern web application for home cleaning services built with Next.js 15 and React 19.

## Features

- Booking system for cleaning services
- Clean and modern UI with Tailwind CSS and DaisyUI
- Responsive design for all devices
- Calendar integration for scheduling with react-calendar
- Interactive animations with Framer Motion
- State management with Zustand
- Form handling with React Hook Form and Zod validation
- Google Maps integration for location services
- Toast notifications with Sonner

## Tech Stack

- Next.js 15.1.7
- React 19.0.0
- TypeScript
- Tailwind CSS 4.0.6
- DaisyUI
- Framer Motion
- Zustand for state management
- React Hook Form with Zod validation
- Google Maps API integration

## Prerequisites

- Node.js 20 or later
- npm (comes with Node.js)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/123rosyid123/home-cleaning-fe.git
cd home-cleaning-fe
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with your configuration.

4. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Building for Production

```bash
npm run build
npm run start
```

## Docker Support

### Building and Publishing the Docker Image

The project uses Azure Container Registry (ACR) for storing Docker images. The image is built and published for both AMD64 and ARM64 architectures.

1. Make sure you have access to Azure Container Registry:
```bash
docker login -u eadevhydrogen01 eadevhydrogen01.azurecr.io
```

2. Build and publish the image:
```bash
# Publish with latest tag
make publish-image

# Publish with specific version
make publish-image VERSION="1.0.0"
```

This will:
- Build multi-architecture images (AMD64 and ARM64)
- Create and push a manifest to ACR
- Clean up local images after pushing

### Running with Docker

```bash
# Pull the image
docker pull eadevhydrogen01.azurecr.io/homecleaning-sg:latest

# Run the container
docker run -p 3000:3000 eadevhydrogen01.azurecr.io/homecleaning-sg:latest
```

### Using Docker Compose

```bash
# Start the application
docker-compose up -d

# Stop the application
docker-compose down
```

## Development

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

