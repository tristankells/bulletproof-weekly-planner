

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


CREATE TABLE `user_profile` (
  `id` bigint(20) NOT NULL,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `login_password` char(60) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `external_type` varchar(16) NOT NULL,
  `external_id` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



INSERT INTO `user_profile` (`id`, `first_name`, `last_name`, `email`, `login_password`, `external_type`, `external_id`) VALUES
(1, 'Junha', 'Yu', 'test@gmail.com', '$2y$10$h61qCV9myUMxYD6VcWI2IOq63Okl7ioDmMM64/ez7rAoIwrz6HQEe', '', ''),
(2, 'Junha', 'Yu', 'junehayu@gmail.com', '', 'google', '109571180129366142465');


ALTER TABLE `user_profile`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);


ALTER TABLE `user_profile`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;COMMIT;
