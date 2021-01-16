-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: identity
-- ------------------------------------------------------
-- Server version	8.0.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `detail`
--

DROP TABLE IF EXISTS `detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detail` (
  `id` int DEFAULT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `gender` varchar(50) DEFAULT NULL,
  `ip_address` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detail`
--

LOCK TABLES `detail` WRITE;
/*!40000 ALTER TABLE `detail` DISABLE KEYS */;
INSERT INTO `detail` VALUES (1,'Dewain','Itzchaki','ditzchaki0@census.gov','Male','64.230.121.163'),(2,'Terese','Stoll','tstoll1@t.co','Female','130.168.69.237'),(3,'Page','Eyre','peyre2@e-recht24.de','Female','174.139.3.6'),(4,'Eal','Drinkale','edrinkale3@earthlink.net','Male','92.192.7.137'),(5,'Karim','Houlison','khoulison4@joomla.org','Male','179.215.56.45'),(6,'Nataline','Lailey','nlailey5@list-manage.com','Female','185.51.9.1'),(7,'Stearne','Matysik','smatysik6@wisc.edu','Male','141.142.50.149'),(8,'Jacob','Goudard','jgoudard7@t-online.de','Male','152.245.194.154'),(9,'Gunter','McGinnell','gmcginnell8@cargocollective.com','Male','190.0.240.167'),(10,'Claudio','Andriesse','candriesse9@bloomberg.com','Male','225.237.221.92'),(11,'Grover','Gildea','ggildeaa@ning.com','Male','107.33.112.5'),(12,'Charleen','Lince','clinceb@slate.com','Female','14.90.82.142'),(13,'Ruby','Garza','rgarzac@npr.org','Female','34.188.152.155'),(14,'Mala','Amps','mampsd@mit.edu','Female','98.63.79.138'),(15,'Rabbi','Brissard','rbrissarde@about.me','Male','175.62.195.7'),(16,'Serene','Mackness','smacknessf@spiegel.de','Female','116.67.169.191'),(17,'Phelia','Groom','pgroomg@upenn.edu','Female','69.13.25.133');
/*!40000 ALTER TABLE `detail` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-01-16 21:30:17
