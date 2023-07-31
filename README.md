# 🧰 Ashi Jewellers Diamonds Project Backend

### Features

- Minimal
- TypeScript v4
- Testing with Jest
- Linting with Eslint and Prettier
- VS Code debugger scripts
- Local development with Nodemon

### Postman collection Document Details

#### `Postman Document Url` - https://documenter.getpostman.com/view/27221337/2s93eVXZMV

This document contains all the high level apis for `authorizations`, `items`, `carts`, `wishlist` and many more.

### Scripts

#### `npm run start:dev`

Starts the application in development using `nodemon` and `ts-node` to do hot reloading.

#### `npm run start`

Starts the app in production by first building the project with `npm run build`, and then executing the compiled JavaScript at `build/index.js`.

#### `npm run build`

Builds the app at `build`, cleaning the folder first.

#### `npm run test`

Runs the `jest` tests once.

#### `npm run test:dev`

Run the `jest` tests in watch mode, waiting for file changes.

#### `npm run prettier-format`

Format your code.

#### `npm run prettier-watch`

Format your code in watch mode, waiting for file changes.

#### `npm i`

This command is used to install the node packages