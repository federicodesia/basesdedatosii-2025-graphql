CREATE DATABASE IF NOT EXISTS graphql;

USE graphql;

CREATE TABLE IF NOT EXISTS Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
);

INSERT INTO Users (name, email) VALUES ('Usuario de prueba', 'prueba@gmail.com');