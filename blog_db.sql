-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: blog
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `post_id` int DEFAULT NULL,
  `user_email` varchar(50) DEFAULT NULL,
  `comment` text,
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `user_email` (`user_email`),
  KEY `post_id` (`post_id`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`user_email`) REFERENCES `users` (`email`),
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,'alexander.clark@example.com','Great post!',1),(11,'alexander.clark@example.com','Interesting topic.',2),(2,'david.brown@example.com','I agree with your point.',3),(12,'david.brown@example.com','Nice insights!',4),(3,'emily.taylor@example.com','Beautiful picture!',5),(13,'emily.taylor@example.com','Well said.',6),(1,'example@example.com','Thanks for sharing.',7),(1,'example@example.com','I enjoyed reading this.',8),(5,'jane.smith@example.com','Keep up the good work!',9),(6,'john.doe@example.com','Inspiring post.',10),(7,'matthew.harris@example.com','Helpful tips.',11),(8,'michael.johnson@example.com','Exciting news!',12),(9,'olivia.wilson@example.com','I love your artwork.',13),(10,'sarah.williams@example.com','Thought-provoking content.',14),(1,'Avielnis222@gmail.com','this is blala comment 2',15),(1,'Avielnis222@gmail.com','this is blala comment 3',16),(1,'Avielnis222@gmail.com','this is blala comment 4',17),(11,'Avielnis222@gmail.com','this is blala comment 4',18),(20,'Avielnis222@gmail.com','this is blala comment 4',19),(20,'Avielnis222@gmail.com','this is blala comment 2',20),(20,'Avielnis222@gmail.com','this is blala comment 1',21);
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_email` varchar(50) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `imgURL` varchar(255) DEFAULT NULL,
  `likes_count` int DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `user_email` (`user_email`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`user_email`) REFERENCES `users` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,'alexander.clark@example.com','Post Title 1','Content of post 1','2023-05-16 14:32:14','https://media.istockphoto.com/id/1218254547/photo/varied-food-carbohydrates-protein-vegetables-fruits-dairy-legumes-on-wood.jpg?b=1&s=170667a&w=0&k=20&c=uGHRWrmqv4Nxdj7iUO4iYavWLjqFB3uwH1K3RQ9NID0=',11),(2,'david.brown@example.com','Post Title 2','Content of post 2','2023-05-16 14:32:14','https://c4.wallpaperflare.com/wallpaper/664/252/56/dog-full-hd-desktop-download-wallpaper-preview.jpg',3),(3,'emily.taylor@example.com','Post Title 3','Content of post 3','2023-05-16 14:32:14','https://c4.wallpaperflare.com/wallpaper/362/276/920/nature-4k-pc-full-hd-wallpaper-preview.jpg',37),(4,'example@example.com','Post Title 4','Content of post 4','2023-05-16 14:35:40','https://picsum.photos/400/300?random=4',2),(5,'jane.smith@example.com','Post Title 5','Content of post 5','2023-05-16 14:35:40','https://picsum.photos/400/300?random=5',11),(6,'john.doe@example.com','Post Title 6','Content of post 6','2023-05-16 14:35:40','https://picsum.photos/400/300?random=6',6),(7,'matthew.harris@example.com','Post Title 7','Content of post 7','2023-05-16 14:35:40','https://picsum.photos/400/300?random=7',4),(8,'michael.johnson@example.com','Post Title 8','Content of post 8','2023-05-16 14:35:40','https://picsum.photos/400/300?random=8',9),(9,'olivia.wilson@example.com','Post Title 9','Content of post 9','2023-05-16 14:35:40','https://c4.wallpaperflare.com/wallpaper/664/252/56/dog-full-hd-desktop-download-wallpaper-preview.jpg',7),(10,'sarah.williams@example.com','Post Title 10','Content of post 10','2023-05-16 14:35:40','https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/RedX.svg/2048px-RedX.svg.png',1),(11,'alexander.clark@example.com','Amazing Sunset','I captured this breathtaking sunset during my vacation.','2023-05-15 15:30:00','https://picsum.photos/400/300?random=11',16),(12,'david.brown@example.com','Delicious Recipe','Check out this delicious recipe for homemade pizza!','2023-05-14 09:45:00','https://picsum.photos/400/300?random=12',8),(13,'emily.taylor@example.com','Travel Adventure','Exploring the beautiful streets of Paris. #TravelDiaries','2023-05-13 07:15:00','https://picsum.photos/400/300?random=13',22),(14,'example@example.com','Movie Recommendation','Just watched an incredible movie! Highly recommended!','2023-05-12 17:00:00','https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/RedX.svg/2048px-RedX.svg.png',6),(18,'alexander.clark@example.com','blabla','dummyText','2023-05-22 15:18:38','https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/RedX.svg/2048px-RedX.svg.png',1),(20,'Avielnis222@gmail.com','this is a first test','this is new post test dummy','2023-05-24 08:11:16','https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/400703/12075071_800.jpg',6),(21,'Avielnis222@gmail.com','this is a second post','bla bla','2023-05-30 14:46:23','https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/RedX.svg/2048px-RedX.svg.png',0),(22,'test@mail.com','this a test post','this is the test post content','2023-05-30 15:20:47','userInfo',0),(23,'test@mail.com','this is a test post','this is the test post content','2023-05-30 15:21:24','https://play-lh.googleusercontent.com/V_P-I-UENK93ahkQgOWel8X8yFxjhOOfMAZjxXrqp311Gm_RBtlDXHLQhwFZN8n4aIQ',0),(24,'Avielnis222@gmail.com','Hello World','Hello, world! It\'s with immense excitement and a touch of trepidation that I take my first step into this vast universe of possibilities. As I embark on this journey of self-expression and exploration, I welcome you to join me on this incredible adventure.\n\nIn a world that is ever-evolving, where boundaries are continuously pushed and ideas are constantly reshaped, it\'s crucial to find our voice and make it heard. Through this humble \"Hello World\" post, I aim to connect with like-minded individuals, curious souls, and passionate learners who share a common desire to embrace knowledge and push the limits of our understanding.\n\nThis phrase, \"Hello World,\" has become an iconic introduction in the realm of computer programming—a humble greeting that marks the beginning of countless coding endeavors. However, beyond the realm of programming, it encapsulates something much deeper—a spirit of exploration, a thirst for knowledge, and a desire to engage with the world around us.\n\nIn this digital era, where technology connects us in unprecedented ways, we have the power to reach out to individuals from diverse backgrounds, cultures, and experiences. We can engage in meaningful conversations, exchange ideas, and challenge one another to grow personally and intellectually. By transcending geographical boundaries, we have the opportunity to create a global community of thinkers, dreamers, and innovators.\n\nThrough this platform, I aspire to share my thoughts, insights, and discoveries with you. From the wonders of science and technology to the intricacies of art and philosophy, from the marvels of nature to the complexities of human existence—we will explore it all. Let\'s delve into the mysteries of the universe, unravel the enigmas of the human mind, and celebrate the beauty that surrounds us.\n\nIn this interconnected world, every individual has a unique story to tell, a perspective waiting to be shared. I invite you, dear reader, to join me on this voyage of enlightenment and introspection. Together, let\'s challenge conventions, shatter limitations, and build bridges of understanding.\n\nSo, whether you\'re a seasoned explorer or just beginning your journey, whether you seek inspiration or wish to inspire others, whether you have burning questions or profound insights—this is the place to be. Let us embark on this incredible adventure of learning, growth, and connection. Together, we can make our voices heard and leave an indelible mark on the tapestry of human knowledge.\n\nWelcome to a world of infinite possibilities. Welcome to our journey. Hello, world!\n\nJoin me on this journey by commenting below and sharing your thoughts and aspirations. Let\'s inspire one another and embrace the power of collective wisdom. Together, we can shape a brighter future.','2023-06-05 15:49:05','https://i0.wp.com/www.agilenative.com/wp-content/uploads/2017/01/001-Agile-Hello-World.png?fit=1745%2C1080&ssl=1',0);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `email` varchar(50) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `full_name` varchar(50) DEFAULT NULL,
  `role` enum('manager','developer','user') DEFAULT 'user',
  `id` int NOT NULL AUTO_INCREMENT,
  `profile_img` text,
  PRIMARY KEY (`email`),
  UNIQUE KEY `email` (`email`),
  KEY `idc_id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('','$2b$12$36Zpf1kyFJUglrqxO3qYe.aSJ13THPoTbCz2LyxAE9GtOKyOo0WBy','','user',16,NULL),('alexander.clark@example.com','$2b$12$234tPV4zeOMvswsGh/0/FueaqdNnL5w77I.tholeVco0zde.9ejRS','Aviel Nisanov','manager',1,NULL),('Avielnis222@gmail.com','$2b$12$McINKbjAPdYHCQd2rpS.ZengNkKfaQxymnCzrzry/9SytoHxEIW3y','Aviel Nisanov','manager',12,'https://scontent.fhfa1-1.fna.fbcdn.net/v/t1.18169-9/1655954_872262172813934_2567599915605774140_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=174925&_nc_ohc=5uSdKTa72uUAX_iURYd&_nc_ht=scontent.fhfa1-1.fna&oh=00_AfCNj1bgfhVd-Bi3po3OKoa3tOhpUdMqKNyyaCju-f_80g&oe=649D16A1'),('david.brown@example.com','$2b$12$eBnexDICxkKY/ZUitx2o0uEf03tbSw/4iAlb/2/bEvCJU7JhxUar.','David Brown','user',2,NULL),('emily.taylor@example.com','$2b$12$sf71GkdcyoHWScMBicKej.59xn8YW32jtq0jXzMJgqXI8eNSsQXIm','Emily Taylor','user',3,NULL),('example@example.com','$2b$12$NwtD4iwWLUCMwVyRnP12x.OZnaDXI860BSWWVjAsojVTDVVPJuYKm','John Doe','user',4,NULL),('jane.smith@example.com','$2b$12$mp/Ia7F6urSTktRZgksYvuggSrnwDs2xxCslCkwNRz7Vp/5b5dSWW','Jane Smith','developer',5,NULL),('john.doe@example.com','$2b$12$jmEsjkWhiEvfhZoNV9f7Aed4/t44PjIAvzs06QAsvFLKP0lcKDCBm','John Doe','user',6,NULL),('matthew.harris@example.com','$2b$12$PVnUUoY3aXLIsvO3DZR.weNfKvPZdO7YR1zWgaHDmnAIC1RrUk0Ga','Matthew Harris','user',7,NULL),('michael.johnson@example.com','$2b$12$lsqw9HymqkrHZutsMRRKXOpzGGT4kiM8KkYPCtBzcj2YfEPTJwGIi','Michael Johnson','user',8,NULL),('olivia.wilson@example.com','$2b$12$LPGvZdZ0hWC1dtpH0rbY8.5/PKgs.TOP.WCd3Efs48cFyhkNnmVD.','Olivia Wilson','user',9,NULL),('sarah.williams@example.com','$2b$12$TRgDylwNerDNhlEZkWHwju2X3GOogTs9rC5ByDAdYmki62DNDmOkK','Sarah Williams','developer',10,NULL),('sophia.martin@example.com','$2b$12$SdSBYRiC.5Z8PiKqywAgF.tRYxaws6mqj2oQjjXHzzqg2nADPM0ma','Sophia Martin','developer',11,NULL),('test@mail.com','$2b$12$JM8.zKuOYjOEJHaQydnEzeQRWAXGxgymEJQC/d30o5GtmZ8Pkuajq','Test Name','user',14,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_sessions`
--

DROP TABLE IF EXISTS `users_sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_sessions` (
  `session_id` varchar(255) NOT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_sessions`
--

LOCK TABLES `users_sessions` WRITE;
/*!40000 ALTER TABLE `users_sessions` DISABLE KEYS */;
INSERT INTO `users_sessions` VALUES ('79403ed0-0385-42a3-bc0b-b5a1aa2dae00',12);
/*!40000 ALTER TABLE `users_sessions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-05 19:02:15
