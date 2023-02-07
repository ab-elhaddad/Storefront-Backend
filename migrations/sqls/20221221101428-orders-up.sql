CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    status VARCHAR (15) NOT NULL,
    user_id INTEGER NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id) 
);