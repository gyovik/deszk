-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 01, 2020 at 11:33 AM
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
-- Table structure for table `cooker_type`
--

CREATE TABLE `cooker_type` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `green_index` float NOT NULL,
  `icon` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cooker_type`
--

INSERT INTO `cooker_type` (`id`, `name`, `green_index`, `icon`) VALUES
(1, 'kombinált tűzhely', 5, 'kombinált_tűzhely'),
(2, 'villanytűzhely', 10, 'villanytűzhely'),
(3, 'gáztűzhely', 5, 'gáztűzhely');

-- --------------------------------------------------------

--
-- Table structure for table `customer_house`
--

CREATE TABLE `customer_house` (
  `id` int(11) NOT NULL,
  `green_value` float NOT NULL,
  `house_type_id` int(11) NOT NULL,
  `heating_type_id` int(11) NOT NULL,
  `cooker_type_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `customer_house_option`
--

CREATE TABLE `customer_house_option` (
  `customer_house_id` int(11) NOT NULL,
  `house_option_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `heating_type`
--

CREATE TABLE `heating_type` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `green_index` float NOT NULL,
  `icon` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `heating_type`
--

INSERT INTO `heating_type` (`id`, `name`, `green_index`, `icon`) VALUES
(1, 'vegyes tüzelés(fa, szén, egyéb)', -10, 'vegyes_tüzelés'),
(2, 'gázfűtés', -5, 'gázfűtés'),
(3, 'elektromos fűtés', 10, 'elektromos_fűtés');

-- --------------------------------------------------------

--
-- Table structure for table `house_option`
--

CREATE TABLE `house_option` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `green_index` float NOT NULL,
  `icon` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `house_option`
--

INSERT INTO `house_option` (`id`, `name`, `green_index`, `icon`) VALUES
(1, 'napelem', 10, 'napelem'),
(2, 'falszigetelés', 10, 'falszigetelés'),
(3, 'tetőszigetelés', 10, 'tetőszigetelés'),
(4, 'többrétegű nyílászárók', 10, 'többrétegű_nyílászárók'),
(5, 'klímaberendezés', 10, 'klímaberendezés'),
(6, 'energiatakarékos nagygépek', 10, 'energiatakarékos_nagygépek'),
(7, 'energiatakarékos izzók', 10, 'energiatakarékos_izzók'),
(8, 'szelektív kukák', 10, 'szelektív_kukák'),
(9, 'irányított ventilláció', 10, 'irányított_ventilláció'),
(10, 'hőszivattyú', 10, 'hőszivattyú'),
(11, 'komposztáló', 5, 'komposztáló'),
(12, 'esővíz tároló', 5, 'esővíz_tároló'),
(13, 'fák, bokrok', 5, 'fák_bokrok'),
(14, 'öntöző rendszer', 5, 'öntöző_rendszer');

-- --------------------------------------------------------

--
-- Table structure for table `house_type`
--

CREATE TABLE `house_type` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `green_index` float NOT NULL,
  `icon` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `house_type`
--

INSERT INTO `house_type` (`id`, `name`, `green_index`, `icon`) VALUES
(1, 'Vályog', -10, 'vályog_szerkezet'),
(2, 'Tégla', 10, 'tégla_szerkezet'),
(3, 'Panel', 5, 'panel_szerkezet'),
(4, 'Fa', 5, 'fa_szerkezet');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cooker_type`
--
ALTER TABLE `cooker_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customer_house`
--
ALTER TABLE `customer_house`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customer_house_option`
--
ALTER TABLE `customer_house_option`
  ADD KEY `fk_customer_house_options_customer_houses1_idx` (`customer_house_id`),
  ADD KEY `fk_customer_house_options_house_options1_idx` (`house_option_id`);

--
-- Indexes for table `heating_type`
--
ALTER TABLE `heating_type`
  ADD PRIMARY KEY (`id`);

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
-- AUTO_INCREMENT for table `cooker_type`
--
ALTER TABLE `cooker_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `customer_house`
--
ALTER TABLE `customer_house`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `heating_type`
--
ALTER TABLE `heating_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
