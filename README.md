# Storefront Backend

### A Backend system for purchase store implemented in Typescript built in NodeJS using Express

### Database built in PostgreSQL

### Unit tests implemented using JasmineJS

</br>

## Before running the project

[1] Create two databases one for testing and one for development by entering your CMD and running these commands:</br>
`psql`</br>
`CREATE DATABASE ${TEST DATABASE NAME};`</br>
`CREATE DATABASE ${DEVELOPMENT DATABASE NAME};`
</br>

[2] Create .env file and add these varibales with your own values.

    DATABASE=######## (DEVELOPMENT - DATABASE NAME)
    HOST=########
    DB_PORT=${port number for database}
    PORT=########
    PASSWORD=########
    USER=########
    TEST_DATABASE=${TEST DATABASE NAME}
    ENV=dev
    SALT=######## [number of salt rounds for bcrypt.hashing function]
    SECRET_KEY=######## [secret key (string) for jwt.sign function]

[3] run `npm i` command to install node_modules folder
</br>

## Useful information

- There are 4 database tables with their associated models, handlers (controlles) and routes</br>
  1- users</br>
  2- products </br>
  3- orders </br>
  4- order_products
