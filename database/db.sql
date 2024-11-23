-- creando base de datos
CREATE DATABASE proyectoNode;

--usando la base de datos
use proyectoNode;

-- creando tablas
CREATE TABLE customer(
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(50) NOT NULL,
direccion VARCHAR(100) NOT NULL,
telefono VARCHAR(15)
);

-- muestra todas las tablas
SHOW TABLES;

--describe la tabla 
describe customer;