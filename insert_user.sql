-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.7.26-log - MySQL Community Server (GPL)
-- Server OS:                    Win64
-- HeidiSQL Version:             12.3.0.6589
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping data for table topone.users: ~2 rows (approximately)
INSERT INTO `users` (`id`, `username`, `email`, `password`, `balance`, `is_active`, `created_at`, `updated_at`) VALUES
	(12, 'thanhdat91', 'dtd081291@gmail.com', '$2a$10$VsD482DH/JAyLrVCk923/ed1e5qtp7WilK6.p9C2iS4.tqk6ZrgNK', 0, 0, '2022-12-27 00:23:15', '2022-12-27 00:23:15'),
	(13, 'minhtam91', 'minhtamho91@gmail.com', '$2a$10$AwwHHYWeTavvdZ3qyK.igO/7Ge3s8dMPy/YTro7CFO.m6zLpLMrHq', 0, 0, '2022-12-27 00:23:56', '2022-12-27 00:23:56');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
