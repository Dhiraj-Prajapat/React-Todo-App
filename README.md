# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


# React Todo App

This is a responsive Todo application built using **React.js**, **Tailwind CSS**, **HTML**, and **JavaScript**. The app helps users manage their tasks effectively by allowing them to add, edit, delete, and mark tasks as complete. It features a clean and modern UI.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)

## Features
- **Add tasks**: Users can add new tasks to their list.
- **Edit tasks**: Users can edit task details (with restrictions on completed tasks).
- **Mark tasks as complete**: Users can mark tasks as done, and prevent editing of completed tasks.
- **Delete tasks**: Users can remove tasks from their list.
- **Responsive design**: Optimized for mobile, tablet, and desktop viewports.

## Tech Stack
- **HTML**
- **Tailwind CSS** - for styling
- **JavaScript**
- **React.js** - frontend framework

## Project Structure

```bash
react-todo-app/
│
├── public/
│   └── index.html       # Main HTML file
│
├── src/
│   ├── assets/          # Static files like images
│   ├── components/      # Reusable UI components
│   ├── constants/       # App constants
│   ├── context/         # Context API files
│   ├── Utils/           # Utility functions
│   ├── App.css          # Main CSS file
│   ├── App.jsx          # Root component
│   ├── index.css        # Global styles
│   └── main.jsx         # App entry point
│
├── .gitignore
├── README.md            # Project documentation
├── package.json         # Project dependencies
├── tailwind.config.js   # Tailwind configuration
└── vite.config.js       # Vite configuration

## Installation
To run this project locally, follow these steps:

Prerequisites
Ensure you have Node.js and npm (Node Package Manager) installed. You can download Node.js from here.

Clone the Repository
git clone https://github.com/yourusername/react-todo-app.git

Navigate to the Project Directory
cd react-todo-app

Install Dependencies
npm install

Run the Application
npm run dev

The app will be served at http://localhost:5173/. Open this URL in your browser to view it.

## Usage
Add Task: Type your task in the input field and click the "Create Task" button.
Edit Task: Click on a task and press the "Edit" button. However, you cannot edit completed tasks.
Complete Task: Mark tasks as done by clicking the "Mark as Done" button.
Delete Task: Remove tasks by pressing the "Delete" button.

## Contributing
Contributions are welcome! If you'd like to improve the app or fix a bug, feel free to create a pull request.