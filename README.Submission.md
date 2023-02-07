# Before running the project :-
[1] Create two databases one for testing and one for development by entering your CMD and running these commands:
psql
CREATE DATABASE `TEST DATABASE NAME`;
CREATE DATABASE `DEVELOPMENT DATABASE NAME`;
 - Note: port number for database is 5432

[2] Crete .env file and add these varibales with your own values
    DATABASE=######## (DEVELOPMENT DATABASE NAME)
    HOST=########
    DB_PORT=######## (port number for database) = 5432
    PORT=########
    PASSWORD=########
    USER=########
    TEST_DATABASE=######## (TEST DATABASE NAME)

    ENV=dev

    SALT=######## (number of salt rounds for bcrypt.hashing function)

    SECRET_KEY=######## (secret key (string) for jwt.sign function)

[3] run `npm i` command to install node_modules folder


# Scripts :-
    "start": "nodemon ./src/server.ts"
    "test": "set ENV=test && db-migrate reset --env test && db-migrate up --env test && npm run build && jasmine --random=false && db-migrate reset --env test"
    "build": "npx tsc"
    "lint-check": "eslint ./src"
    "lint-fix": "eslint ./src --fix"
    "prettier": "npx prettier --write ."


# Useful information :-
- There are 4 database tables with their associated models, handlers (controlles) and routes
  1- users 2- products 3- orders 4- order_products

- order_products table is a join table between orders and products to resolve the many-to-many realtionship between the two tables

# Changes :-
 - Mention port number for database.
 - Add .env to .gitignore file.
 - package installation instructions updated and the testing works well
