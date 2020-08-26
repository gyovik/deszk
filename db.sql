-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 26, 2020 at 09:18 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `deszk`
--

-- --------------------------------------------------------

--
-- Table structure for table `customer_house`
--

CREATE TABLE `customer_house` (
  `id` int(11) NOT NULL,
  `green_value` float NOT NULL,
  `house_type_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `customer_house_option`
--

CREATE TABLE `customer_house_option` (
  `customer_houses_id` int(11) NOT NULL,
  `house_options_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `house_option`
--

CREATE TABLE `house_option` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `green_index` float NOT NULL,
  `icon` blob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `house_option`
--

INSERT INTO `house_option` (`id`, `name`, `green_index`, `icon`) VALUES
(1, 'napelem', 10, NULL),
(2, 'falszigetelés', 10, NULL),
(3, 'tetőszigetelés', 10, NULL),
(4, 'többrétegű nyílászárók', 10, NULL),
(5, 'klímaberendezés', 10, NULL),
(6, 'fűtés - vegyes tüzelés(fa, szén, egyéb)', -10, NULL),
(7, 'fűtés - gázfűtés', -5, NULL),
(8, 'fűtés - elektromos fűtés', 10, NULL),
(9, 'energiatakarékos nagygépek', 10, NULL),
(10, 'gáz sütő', 5, NULL),
(11, 'kombinált sütő', 5, NULL),
(12, 'elektromos sütő', 10, NULL),
(13, 'energiatakarékos izzók', 10, NULL),
(14, 'szelektív kukák', 10, NULL),
(15, 'irányított ventilláció', 10, NULL),
(16, 'hőszivattyú', 10, NULL),
(17, 'komposztáló', 5, NULL),
(18, 'esővíz tároló', 5, NULL),
(19, 'fák, bokrok', 5, NULL),
(20, 'öntöző rendszer', 5, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `house_type`
--

CREATE TABLE `house_type` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `green_index` float NOT NULL,
  `icon` blob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `house_type`
--

INSERT INTO `house_type` (`id`, `name`, `green_index`, `icon`) VALUES
(1, 'Vályog', -10, NULL),
(2, 'Tégla', 10, NULL),
(3, 'Panel', 5, NULL),
(4, 'Fa', 5, NULL),
(5, 'Egyéb', -10, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customer_house`
--
ALTER TABLE `customer_house`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customer_house_option`
--
ALTER TABLE `customer_house_option`
  ADD KEY `fk_customer_house_options_customer_houses1_idx` (`customer_houses_id`),
  ADD KEY `fk_customer_house_options_house_options1_idx` (`house_options_id`);

--
-- Indexes for table `house_option`
--
ALTER TABLE `house_option`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `house_type`
--
ALTER TABLE `house_type`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customer_house`
--
ALTER TABLE `customer_house`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `house_option`
--
ALTER TABLE `house_option`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `house_type`
--
ALTER TABLE `house_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
