# Comeon Casino - test

A simple casino game platform built using React, TypeScript, and other technologies.

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Getting Started](#getting-started)
4. [Project Structure](#project-structure)

## Features

- User authentication
- Game list with search and category filters
- User dashboard with avatar and game search
- Game play functionality with game library integration

## Technologies Used

- React
- TypeScript
- React Router
- Custom hooks
- Fetch API
- CSS

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository

```bash
git clone https://github.com/mario-website/comeon.git
```

2. Navigate to the project directory

```bash
cd comeon
```

3. Install the dependencies

```bash
npm install
```

4. Run the application in development mode

```bash
npm start
```

5. It should automatically open your browser and navigate to http://localhost:3000

## Project Structure

src
├── assets
│ ├── images
│ └── styles
├── components
│ ├── Games
│ ├── GameList
│ ├── UserDashboard
│ └── ...
├── hooks
│ ├── useAuth
│ └── ...
├── mock
│ ├── mock-api.js
│ └── mock-data.json
├── stylesheets
│ │ ├── components
│ │ ├── themes
│ ├── semantic.css
│ └── styles.css
├── types
│ ├── global.d.ts
│ └── ...
└── index.tsx

src
├── assets
│   └── images
├── components
│   ├── Casino
│   ├── Games
│   ├── GameList
│   ├── UserDashboard
│   └── ...
├── context
│   └── AuthContext.tsx
├── mock
│   ├── mock-api.js
│   └── mock-data.json
├── stylesheets
│   └── ...
├── types
│   └── global.d.ts
├── App.tsx
└── index.tsx