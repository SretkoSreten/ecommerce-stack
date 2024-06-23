# eCommerce Platform

## Table of Contents
- [Introduction](#introduction)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Features](#features)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This project is a comprehensive eCommerce platform designed for selling products online. It includes backend services built with NestJS and MySQL for data management, a frontend application developed using React with Vite for fast development, and Docker with Docker Compose for containerization and deployment.

## Technologies Used

- **NestJS**: Backend framework for building efficient and scalable server-side applications.
- **MySQL**: Relational database management system used for storing and managing product and user data.
- **React with Vite**: Frontend library and build tool for creating responsive and interactive user interfaces.
- **Docker with Docker Compose**: Containerization technology for packaging the application and its dependencies into standardized units.

## Project Structure

The project is organized into two main folders:
- **packages/server**: Contains the backend server implemented with NestJS.
- **packages/web**: Contains the frontend application built with React and Vite.

## Features

- **Stripe Integration**: Seamless payment processing integration using Stripe for secure and reliable transactions.
- **User Management**: Registration, authentication, and profile management for customers and administrators.
- **Product Catalog**: Browse, search, and filter products with detailed product pages.
- **Order Processing**: Cart management, checkout flow, and order history tracking.

## Getting Started

To get a local copy of the project up and running, follow these steps

2. **Install Dependencies**:

- Backend:
  ```
  cd packages/server
  npm install
  ```
- Frontend:
  ```
  cd packages/web
  npm install
  ```

3. **Set Up Environment Variables**: 
Configure environment variables for Stripe API keys, MySQL connection details, etc.

4. **Start Application**:

- Using Docker Compose:
  ```
  docker-compose up
  ```
- Or separately:

  - Backend:
    ```
    cd packages/server
    npm run start:dev
    ```
  - Frontend:
    ```
    cd packages/web
    npm run dev
    ```

5. **Access the Application**: 
Open `http://localhost:3000` in your web browser.

6.  **How application works**: 
[Watch the video](https://res.cloudinary.com/publicproject/video/upload/v1719168576/ecommerce/Screen_Recording_-_Jun_23_2024_vlytwx.mp4)
