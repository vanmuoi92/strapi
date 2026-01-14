# Nimo Electric Kart

This project is a web application for Nimo Electric Kart, consisting of a Strapi
backend and a React frontend.

## Project Structure

-   **backend/**: Strapi Headless CMS application.
    -   `backups/`: Database dumps and backup files.
    -   `config/`: Strapi configuration files.
    -   `src/`: Application source code (APIs, content types, extensions).
-   **frontend/**: React application built with Vite.
    -   `src/`: Frontend source code.
-   **car-configurator/**: 3D Car Configurator module.
-   **docs/**: Project documentation and deployment guides.

## Getting Started

### Prerequisites

-   Node.js (>= 18)
-   npm

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    ```

2.  **Install Backend Dependencies:**

    ```bash
    cd backend
    npm install
    ```

3.  **Install Frontend Dependencies:**
    ```bash
    cd frontend
    npm install
    ```

### Running the Application

1.  **Start the Backend:**

    ```bash
    cd backend
    npm run develop
    ```

    The backend will be available at `http://localhost:1337`.

2.  **Start the Frontend:**
    ```bash
    cd frontend
    npm run dev
    ```
    The frontend will be available at `http://localhost:3000` (or the port
    specified by Vite).

## Documentation

For detailed guides, please refer to the `docs/` directory:

-   [Deployment Guide](docs/GCP_DEPLOYMENT_GUIDE.md)
-   [Brief](docs/Brief.md)
-   [Build Instructions](docs/build.md)
