SET time_zone = "+00:00";

USE higuys;

CREATE TABLE users(
    id INT PRIMARY KEY,
    Email VARCHAR(30) UNIQUE,
    username VARCHAR(100),
    Password VARCHAR(255),
    image VARCHAR(100),
    active BOOLEAN,
);

CREATE TABLE users(
    id INT PRIMARY KEY,
    code INT,
    expires DATETIME,
    CONSTRAINT FOREIGN KEY(id) REFERENCES users(id),
);

-- Account activation
DELIMITER $$
CREATE PROCEDURE accActivate( uid INT )
BEGIN
    UPDATE users SET active = true WHERE id = uid;
    DELETE FROM verify WHERE id=uid;
END$$
DELIMITER ;