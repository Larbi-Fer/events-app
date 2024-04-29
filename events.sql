-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 17, 2024 at 12:30 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `events`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `accActivate` (`uid` INT)   BEGIN
    UPDATE users SET active = true WHERE id = uid;
    DELETE FROM verify WHERE id=uid;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `attendees`
--

CREATE TABLE `attendees` (
  `userId` int(11) DEFAULT NULL,
  `eventId` int(11) DEFAULT NULL,
  `orderDate` datetime DEFAULT NULL,
  `isAttend` tinyint(1) DEFAULT NULL,
  `isLike` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `attendees`
--

INSERT INTO `attendees` (`userId`, `eventId`, `orderDate`, `isAttend`, `isLike`) VALUES
(21, 14, '2024-03-24 08:41:24', 1, 0),
(22, 12, '2024-03-16 07:37:16', 1, 0),
(21, 12, '2024-03-11 07:37:09', 1, 0),
(18, 12, '2024-03-13 07:37:04', 0, 0),
(18, 14, '2024-03-12 07:12:59', 1, 0),
(21, 17, '2024-03-08 07:36:47', 0, 0),
(18, 17, '2024-03-17 07:06:20', 1, 0),
(22, 17, '2024-03-16 07:19:29', 1, 0),
(17, 17, '2024-03-21 16:24:19', 1, 0),
(17, 14, '2024-03-25 17:59:06', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `authorId` int(11) DEFAULT NULL,
  `eventId` int(11) DEFAULT NULL,
  `text` text DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `reply` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `authorId`, `eventId`, `text`, `date`, `reply`) VALUES
(1, 22, 17, 'Msg 1', '2024-03-11 18:34:08', NULL),
(2, 18, 17, 'Msg 2', '2024-03-12 18:34:12', NULL),
(3, 21, 17, 'Reply 1', '2024-03-12 17:34:24', 1),
(4, 21, 17, 'Reply 2', '2024-03-12 12:34:40', 2),
(5, 22, 17, 'Reply 3 in Msg No 1', '2024-03-12 18:34:43', 1),
(6, 17, 17, 'Msg 3', '2024-03-12 10:34:48', NULL),
(7, 21, 17, 'Test', '2024-03-13 18:50:43', NULL),
(8, 22, 12, 'Hello', '2024-03-14 11:17:24', NULL),
(9, 18, 12, 'Welcome', '2024-03-14 11:17:31', 8),
(10, 21, 12, 'Welcome', '2024-03-14 11:17:57', 8),
(11, 21, 12, 'What is this?', '2024-03-14 11:18:10', NULL),
(12, 18, 12, 'Course', '2024-03-14 11:18:33', 11),
(13, 21, 12, 'Thanks', '2024-03-14 11:30:06', 11),
(15, 21, 14, 'The first comment', '2024-03-14 12:31:12', NULL),
(24, 18, 13, 'What id this?', '2024-03-16 09:07:22', NULL),
(25, 22, 13, 'MERN tutorial, (MongoDB Express React Node)', '2024-03-16 09:10:11', 24);

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `creator` int(11) DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  `description` longtext NOT NULL,
  `category` varchar(40) DEFAULT NULL,
  `tags` varchar(100) NOT NULL,
  `image` varchar(100) DEFAULT NULL,
  `location` varchar(50) DEFAULT NULL,
  `startDate` datetime DEFAULT NULL,
  `endDate` datetime DEFAULT NULL,
  `isDue` tinyint(1) DEFAULT NULL,
  `dueDate` datetime DEFAULT NULL,
  `isMax` tinyint(1) DEFAULT NULL,
  `max` int(11) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `attendButton` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `creator`, `title`, `description`, `category`, `tags`, `image`, `location`, `startDate`, `endDate`, `isDue`, `dueDate`, `isMax`, `max`, `url`, `attendButton`) VALUES
(12, 18, 'AI Day', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium autem consequatur corporis delectus doloremque dolorum eos, expedita facere fugit harum iusto, ipsam laboriosam maiores maxime molestiae nobis, nobis quaerat quasi quos repellat repudiandae, repudiandae, rerum, saepe, sequi, similique soluta tempora tenetur, tenetur, totam, ut voluptas voluptates voluptatum! Amet, autem, consequatur, corporis, delectus, doloremque, dolorum, eos, expedita, facere, fugit, harum, iusto, ipsam, laboriosam, maiores, maxime, molestiae, nobis, nobis, quaerat, quasi, quos, repellat', 'Programming', 'AI,Programming', 'https://utfs.io/f/41d1cc89-3e06-4b10-b448-6b0bb12cd2f7-5tad3k.png', 'New york, USA', '2024-03-14 07:00:00', '2024-03-14 07:30:00', 1, '2024-03-10 22:59:00', 1, 2, '', 1),
(13, 22, 'Web development', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium autem consequatur corporis delectus doloremque dolorum eos, expedita facere fugit harum iusto, ipsam laboriosam maiores maxime molestiae nobis, nobis quaerat quasi quos repellat repudiandae, repudiandae, rerum, saepe, sequi, similique soluta tempora tenetur, tenetur, totam, ut voluptas voluptates voluptatum! Amet, autem, consequatur, corporis, delectus, doloremque, dolorum, eos, expedita, facere, fugit, harum, iusto, ipsam, laboriosam, maiores, maxime, molestiae, nobis, nobis, quaerat, quasi, quos, repellat', 'Programming', 'web,javascript,js,react,next,mongodb', 'https://utfs.io/f/6fa4eb49-48aa-4240-9210-13e280e61e20-4nu8ou.png', 'Online', '2024-03-08 06:00:00', '2024-03-08 08:00:00', 0, NULL, 0, NULL, '', 1),
(14, 22, 'MERN application', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium autem consequatur corporis delectus doloremque dolorum eos, expedita facere fugit harum iusto, ipsam laboriosam maiores maxime molestiae nobis, nobis quaerat quasi quos repellat repudiandae, repudiandae, rerum, saepe, sequi, similique soluta tempora tenetur, tenetur, totam, ut voluptas voluptates voluptatum! Amet, autem, consequatur, corporis, delectus, doloremque, dolorum, eos, expedita, facere, fugit, harum, iusto, ipsam, laboriosam, maiores, maxime, molestiae, nobis, nobis, quaerat, quasi, quos, repellat', 'Programming', 'node,react,mongodb,express', 'https://utfs.io/f/cfd9a235-4d3c-43e8-bf42-7f3f0abc3830-66a1rl.jpg', 'Paris', '2024-04-11 08:30:00', '2024-04-11 10:30:00', 0, NULL, 0, NULL, 'https://www.coursera.org/specializations/mean-stack', 1),
(17, 21, 'Machine Learning', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium autem consequatur corporis delectus doloremque dolorum eos, expedita facere fugit harum iusto, ipsam laboriosam maiores maxime molestiae nobis, nobis quaerat quasi quos repellat repudiandae, repudiandae, rerum, saepe, sequi, similique soluta tempora tenetur, tenetur, totam, ut voluptas voluptates voluptatum! Amet, autem, consequatur, corporis, delectus, doloremque, dolorum, eos, expedita, facere, fugit, harum, iusto, ipsam, laboriosam, maiores, maxime, molestiae, nobis, nobis, quaerat, quasi, quos, repellat', 'Artificial Intelligence', 'python,AI,ML,IBM,programming', 'https://utfs.io/f/12bf58db-6c3e-4e6e-bb87-e1bf22242fc3-wy0zr0.jpg', 'Online', '2024-04-10 08:00:00', '2024-04-10 10:30:00', 1, '2024-04-08 22:59:00', 1, 250, 'https://www.coursera.org/learn/machine-learning-with-python', 1),
(18, 21, 'Bechar AI Forum', '🔹ستحتضن جامعة طاهري محمد بشار \" منتدى بشار للذكاء الإصطناعي \" واحدا من أهم المنتديات في مجال الذكاء الإصطناعي و بإشراف و رعاية من والي ولاية بشار السيد محمد السعيد بن قاموا بغية مد الجسور بين الجامعة و محيطها الخارجي.\n🔹المنتدى سيشهد حضور جل الهيئات التنفيذية للولاية و كذا ممثلين عن كثير من الهيئات عن القطاع العام و الخاص بغية بحث سبل دعم التحول الرقمي و استشراف استخدام تطبيقات و حلول الذكاء الإصطناعي في عديد المجالات و الميادين.\n🔹الحدث من تنظيم كلية العلوم الدقيقة بجامعة طاهري محمد بشار و بالتنسيق مع دار الذكاء الإصطناعي و المؤسسة الفرعية تاك_إينوف المختصة أيضا في الحلول الرقمية و الذكية سيعقد بالمدرج المركزي يوم الخميس 21 مارس 2024 بدءا من الساعة العاشرة صباحا.', 'Artificial Intelligence', 'Bechar,University,AI,UTMB,BecharAIForum,BecharAIHouse,Techlnnov', 'https://utfs.io/f/db610b91-4a59-4cb7-aea4-78e2b36716c3-f051u5.jpg', 'University Tahri Mohamed of Bechar', '2024-03-21 09:00:00', '2024-03-21 11:00:00', 0, NULL, 0, NULL, '', 0);

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `follower` int(11) NOT NULL,
  `followed` int(11) NOT NULL,
  `isFollow` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`follower`, `followed`, `isFollow`) VALUES
(17, 22, 1),
(18, 21, 1),
(18, 22, 1),
(21, 18, 0),
(21, 22, 1),
(22, 18, 0);

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `userID` int(11) DEFAULT NULL,
  `relatedUser` int(11) NOT NULL,
  `message` text DEFAULT NULL,
  `redirectUrl` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `isRead` tinyint(1) DEFAULT 0,
  `isOpen` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `userID`, `relatedUser`, `message`, `redirectUrl`, `createdAt`, `isRead`, `isOpen`) VALUES
(1, 21, 22, 'Ahmed add new Event - Web development', '/event/13', '2024-04-03 07:10:45', 1, 1),
(2, 21, 22, 'Ahmed add new event - MERN application', '/event/14', '2024-04-03 17:43:34', 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `isGoogle` tinyint(1) NOT NULL,
  `image` varchar(255) NOT NULL,
  `active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `username`, `password`, `isGoogle`, `image`, `active`) VALUES
(17, 'larbi.prog@gmail.com', 'larbiFer', '$2b$10$n2V6K./kKTnVhAsBG3hHOOQ3tIqquIdGtRlbgsqtHkn0w6wvBUlIG', 0, '/profile.jpg', 1),
(18, 'ferhaoui.20044@gmail.com', 'larbi Ferhaoui', '$2b$10$YFuZ1X73YbBMOzmIHRlOpuP0WH7nXnMWEKcuFk.XdsNNOHXhK/YoC', 0, '/profile.jpg', 1),
(21, 'larbi.myb@gmail.com', 'Larbi Fer', '$2b$10$dKvaGNWPTrsf5QidIMmsROdEjiRW2tMKR0RX1QCC73gKCv/AEUd0G', 0, '/profile.jpg', 1),
(22, 'ferhaoui.20043@gmail.com', 'Ahmed', '$2b$10$6ld06YwCsgQ7aAAJvSjizuS5j4zRZXKXvADACMEHdYsjNg6RHe8XS', 0, '/profile.jpg', 1);

-- --------------------------------------------------------

--
-- Table structure for table `verify`
--

CREATE TABLE `verify` (
  `id` int(11) NOT NULL,
  `code` int(11) NOT NULL,
  `expires` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attendees`
--
ALTER TABLE `attendees`
  ADD UNIQUE KEY `userId` (`userId`,`eventId`),
  ADD KEY `eventId` (`eventId`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `creator` (`authorId`),
  ADD KEY `eventId` (`eventId`),
  ADD KEY `reply` (`reply`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`,`creator`),
  ADD KEY `creator` (`creator`);

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD PRIMARY KEY (`follower`,`followed`),
  ADD KEY `followed` (`followed`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userID` (`userID`),
  ADD KEY `relatedUser` (`relatedUser`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `verify`
--
ALTER TABLE `verify`
  ADD UNIQUE KEY `id` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `attendees`
--
ALTER TABLE `attendees`
  ADD CONSTRAINT `attendees_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `attendees_ibfk_2` FOREIGN KEY (`eventId`) REFERENCES `events` (`id`);

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`authorId`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `comments_ibfk_3` FOREIGN KEY (`eventId`) REFERENCES `events` (`id`),
  ADD CONSTRAINT `comments_ibfk_4` FOREIGN KEY (`reply`) REFERENCES `comments` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `events_ibfk_1` FOREIGN KEY (`creator`) REFERENCES `users` (`id`);

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`follower`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`followed`) REFERENCES `users` (`id`);

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `notifications_ibfk_2` FOREIGN KEY (`relatedUser`) REFERENCES `users` (`id`);

--
-- Constraints for table `verify`
--
ALTER TABLE `verify`
  ADD CONSTRAINT `verify_ibfk_1` FOREIGN KEY (`id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
