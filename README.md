```
# Fullstack Project with Docker Compose

This project demonstrates a full-stack web application using Docker Compose to orchestrate multiple services including a backend server, MySQL database, and a React frontend built with Vite.

## Prerequisites

Make sure you have Docker and Docker Compose installed on your system.

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Project Structure

```
packages/
│
├── server/          # Backend server (NestJs)
├── web/         # Frontend app (React with Vite)
├── docker-compose.yml     # Docker Compose configuration file
└── README.md         # This README file
```

## Running the Application

To run the entire application using Docker Compose:

1. Clone this repository:

   ```bash
   git clone <repository-url>
   cd fullstack-project
   ```

2. Build and start the services:

   ```bash
   docker-compose up
   ```

   This command will start:
   - Backend server exposed on port `4000`
   - MySQL database exposed on port `3306`
   - Frontend server exposed on port `3000`

3. Access the application:

   - Backend API: `http://localhost:4000`
   - Frontend app: `http://localhost:3000`

## Services

### Backend Server

The backend server is a Node.js application using Express framework. It serves APIs and connects to the MySQL database.

- **API Routes**: Define your API routes in `server/src/api`.
- **Configuration**: Configuration files are located in `server/config`.
- **Dependencies**: Check `server/package.json` for dependencies.

### MySQL Database

MySQL database is used to store application data. It is initialized with sample data on startup.

- **Connection**: Hostname: `mysql`, Port: `3306`
- **Database**: Default database is `ecommerce`.
- **Configuration**: Database configuration is set in `docker-compose.yml`.

### Frontend App

The frontend is built with React using Vite for fast development.

- **Source**: Source files are located in `web/src`.
- **Building**: Check `web/package.json` for build scripts.
- **Dependencies**: All dependencies are listed in `web/package.json`.

## Development

For development purposes, you can run each service separately using Docker or directly on your local environment.

- **server**: Run `cd packages/server && npm install && npm run start:dev`.
- **web**: Run `cd packages/web && npm install && npm run dev`.

## Contributing

Feel free to contribute by submitting issues or pull requests. Please follow the existing coding style and commit message format.

## License

This project is licensed under the [MIT License](LICENSE).
```
