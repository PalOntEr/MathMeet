# MathMeet
This repository contains a video chat application called MathMeet, that uses React with Vite for the front end, C# ASP.NET Core for the backend, and SQL Server as the database. The application supports real-time chat and videochat functionality.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [License](#license)

## Features

- Real-time video chat
- Real-time text chat
- User authentication
- Chat history
- Sending files
- Encrypting chat messages
- Location sending through google maps API

## Prerequisites

- Node.js
- .NET Core SDK
- SQL Server
- npm

## Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/PalOntEr/MathMeet.git
    cd MathMeet
    ```

2. **Install front end dependencies**

    ```bash
    cd poi2024.client
    npm install
    ```

3. **Install backend dependencies**

    ```bash
    cd POI2024.Server
    dotnet restore
    ```

4. **Set up the database**

    Ensure you have a running instance of SQL Server. Update the connection string in `appsettings.json`, inside the POI2024.Server folder, to match your SQL Server configuration.

    ```json
    "ConnectionStrings": {
        "DefaultConnection": "Server=your_server;Database=video_chat_db;User Id=your_user;Password=your_password;"
    }
    ```

5. **Apply database migrations**

    ```bash
    dotnet ef database update
    ```

## Usage

1. **Start the backend server**

    ```bash
    cd backend
    dotnet run
    ```

2. **Start the front end**

    ```bash
    cd frontend
    npm run dev
    ```

## Technologies Used

- **Front End:** React, Vite, CSS
- **Back End:** ASP.NET Core, SignalR
- **Database:** SQL Server

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
