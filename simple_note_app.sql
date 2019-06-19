-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 19, 2019 at 05:26 PM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.3.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `simple_note_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`, `timestamp`) VALUES
(1, 'Sports', '2019-06-17 16:12:49'),
(2, 'programming', '2019-06-19 03:01:34'),
(3, 'Nature', '2019-06-19 14:35:52');

-- --------------------------------------------------------

--
-- Table structure for table `notes`
--

CREATE TABLE `notes` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `note` varchar(255) NOT NULL,
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `notes`
--

INSERT INTO `notes` (`id`, `title`, `note`, `time`, `category_id`) VALUES
(1, 'Make a new Project', 'Tomorrow i should completed some new project from my office', '2019-06-17 17:01:00', 1),
(4, 'Playing Basketball', 'Lorem ipsum dolor set amet', '2019-06-17 17:03:00', 2),
(6, 'Mandi', 'ayo mandi!', '2019-06-17 17:04:00', 1),
(7, 'Test', 'Lorem ipsum dolor sit amet', '2019-06-19 20:39:51', 2),
(8, 'Test2', 'Lorem ipsum dolor sit amet', '2019-06-19 20:39:51', 1),
(9, 'Test3', 'Lorem ipsum dolor sit amet', '2019-06-19 20:39:51', 1),
(10, 'Test4', 'Lorem ipsum dolor sit amet', '2019-06-19 20:39:51', 2),
(11, 'Test5', 'Lorem ipsum dolor sit amet', '2019-06-19 20:39:51', 1),
(12, 'Test6', 'Lorem ipsum dolor sit amet', '2019-06-19 20:39:51', 2),
(13, 'Test7', 'Lorem ipsum dolor sit amet', '2019-06-19 20:39:51', 2),
(14, 'Test8', 'Lorem ipsum dolor sit amet', '2019-06-19 20:39:51', 1),
(15, 'Tes10', 'Lorem ipsum dolor set amet dolor kolor', '2019-06-19 21:43:20', 3),
(16, 'Tes11', 'Lorem ipsum dolor set amet dolor kolor', '2019-06-19 21:43:20', 3),
(17, 'Tes12', 'Lorem ipsum dolor set amet dolor kolor', '2019-06-19 21:43:20', 2),
(18, 'Tes10', 'Lorem ipsum dolor set amet dolor kolor', '2019-06-19 21:43:28', 3),
(19, 'Tes11', 'Lorem ipsum dolor set amet dolor kolor', '2019-06-19 21:43:28', 3),
(20, 'Tes12', 'Lorem ipsum dolor set amet dolor kolor', '2019-06-19 21:43:28', 2),
(21, 'Tes10', 'Lorem ipsum dolor set amet dolor kolor', '2019-06-19 21:43:30', 3),
(22, 'Tes11', 'Lorem ipsum dolor set amet dolor kolor', '2019-06-19 21:43:30', 3),
(23, 'Tes12', 'Lorem ipsum dolor set amet dolor kolor', '2019-06-19 21:43:30', 2),
(24, 'Tes10', 'Lorem ipsum dolor set amet dolor kolor', '2019-06-19 21:43:31', 3),
(25, 'Tes11', 'Lorem ipsum dolor set amet dolor kolor', '2019-06-19 21:43:31', 3),
(26, 'Tes12', 'Lorem ipsum dolor set amet dolor kolor', '2019-06-19 21:43:31', 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `notes`
--
ALTER TABLE `notes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
