SET time_zone = "+00:00";

USE events;

CREATE TABLE users(
    id INT PRIMARY KEY AUTO,
    Email VARCHAR(30) UNIQUE,
    username VARCHAR(100),
    Password VARCHAR(255),
    image VARCHAR(100),
    active BOOLEAN
);

CREATE TABLE users(
    id INT PRIMARY KEY,
    code INT,
    expires DATETIME,
    CONSTRAINT FOREIGN KEY(id) REFERENCES users(id)
);

CREATE TABLE events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    creator INT,
    title VARCHAR(100),
    description LONGTEXT,
    category VARCHAR(40),
    tags VARCHAR(100),
    image VARCHAR(100),
    location VARCHAR(50),
    startDate DATETIME,
    endDate DATETIME,
    isDue BOOLEAN,
    dueDate DATETIME,
    isMax BOOLEAN,
    max INT,
    url VARCHAR(255),
    attendButton BOOLEAN,
    UNIQUE (id, creator),
    CONSTRAINT FOREIGN KEY(creator) REFERENCES users(id)
)

CREATE TABLE attendees (
    userId INT,
    eventId INT,
    orderDate DATETIME,
    isAttend BOOLEAN,
    isLike BOOLEAN,
    UNIQUE (userId, eventId),
    CONSTRAINT FOREIGN KEY(userId) REFERENCES users(id),
    CONSTRAINT FOREIGN KEY(eventId) REFERENCES events(id)
)

-- Account activation
DELIMITER $$
CREATE PROCEDURE accActivate( uid INT )
BEGIN
    UPDATE users SET active = true WHERE id = uid;
    DELETE FROM verify WHERE id=uid;
END$$
DELIMITER ;