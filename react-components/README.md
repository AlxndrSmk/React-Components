A long time ago in a 🌌 galaxy far, far away…
<!-- DESCRIPTION -->
STAR WARS application allows users to search for Star Wars characters, planets, starships, films, and vehicles from the Star Wars API. The application also supports search and pagination on server side.

Deployment Link: [Star Wars](https://alxndr-smk-react-components.netlify.app/)

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#technology-stack">Technology Stack</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#usage">Usage</a></li>
  </ol>
</details>

<!-- TECHNOLOGY STACK -->
## Technology Stack
The project uses the following technologies:

- **React:** A popular JavaScript library for building user interfaces. It enables the creation of dynamic and responsive web applications.

- **React Router:** A library for managing routing and navigation in React applications, making it easy to create single-page applications.

- **TypeScript:** A statically typed superset of JavaScript that helps catch errors early and improve code quality.

- **ESLint:** A tool for identifying and fixing problems in your JavaScript code, ensuring code consistency and best practices.

- **Prettier:** An opinionated code formatter that automatically formats your code to follow a consistent style.

- **Husky:** A tool that helps enforce code quality and standards by running scripts (e.g., linting) before commits are made.

<!-- GETTING STARTED -->
## Getting Started

This is an example of how you can run a project locally. Follow these simple steps as an example.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/AlxndrSmk/React-Components.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```

<!-- USAGE EXAMPLES -->
## Usage

### Running the Application

To run the application, use the following command:
```
   npm run build
```
The application will be launched in development mode and can be accessed at [http://localhost:5173](http://localhost:5173).


### Code Formatting and Linting

This project uses ESLint and Prettier for code formatting and linting. Husky is also configured to run pre-commit hooks to ensure code quality. Before committing changes, the pre-commit hooks will automatically format the code using Prettier and check for linting errors using ESLint.

To format the code using Prettier manually, use the following command:
```
   npm run format
```
To run ESLint for TypeScript and TSX files, use the following command:
```
   npm run lint
```


### Building the Project

To create an optimized production build of the project, use the following command:
```
   npm run build
```

## Preview

Before running the preview, make sure you have a production build ready by running the `npm run build` command.

To preview the build and see how the application works in production mode, use the following command:
```
   npm run preview
```

## Available Commands
There are also other useful commands in the application available

- `npm run format:fix`: To automatically fix Prettier formatting for TypeScript, TSX, SCSS and JSON files.
- `npm run lint:fix`: To automatically fix ESLint errors for TypeScript and TSX files inside /src folder.

And remember...
You should ⚔️ fight evil, not 🤝 join it!
