CREATE TABLE board (
    id 		            bigint NOT NULL AUTO_INCREMENT,
    name 	            varchar(100) NOT NULL,
    description         text,
    PRIMARY KEY (id)
);

CREATE TABLE client (
    id                  bigint NOT NULL AUTO_INCREMENT,
    full_name           varchar(30),
    abbreviation        varchar(10),
    board_id            bigint REFERENCES board(id),
    board_position      int,
    colour               int DEFAULT 0,
    CONSTRAINT unq_board_id_client_name UNIQUE(full_name, board_position),
    CONSTRAINT unq_board_id_abbreviation UNIQUE(abbreviation, board_position),
    PRIMARY KEY (id)
);

CREATE TABLE consultant (
    id              bigint NOT NULL AUTO_INCREMENT,
    full_name       varchar(30),
    job_title       varchar(30),
    board_id        bigint NOT NULL REFERENCES board(id),
    board_position  int,
    CONSTRAINT unq_board_id_consultant_name UNIQUE(full_name, board_position),
    PRIMARY KEY (id)
);

CREATE TABLE allocation (
    consultant_id       bigint NOT NULL REFERENCES consultant(id),
    client_id           bigint  REFERENCES client(id),
    allocation_slot     int NOT NULL,
    office_status       int default 0,
    date_created        datetime NOT NULL ,
    date_updated        datetime NOT NULL default current_timestamp ON UPDATE current_timestamp,
    PRIMARY KEY (consultant_id, allocation_slot, date_created)
);


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
  `external_id` varchar(64) NOT NULL,
  'theme'  office_status int default 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



INSERT INTO `user_profile` (`id`, `first_name`, `last_name`, `email`, `login_password`, `external_type`, `external_id`) VALUES
(1, 'Junha', 'Yu', 'test@gmail.com', '$2y$10$h61qCV9myUMxYD6VcWI2IOq63Okl7ioDmMM64/ez7rAoIwrz6HQEe', '', ''),
(2, 'Junha', 'Yu', 'junehayu@gmail.com', '', 'google', '109571180129366142465');


ALTER TABLE `user_profile`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);


ALTER TABLE `user_profile`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;COMMIT;



create TABLE membership (
id 		        	    bigint NOT NULL AUTO_INCREMENT,
user_profile_id         bigint NOT NULL REFERENCES user_profile(id),
board_id	    		bigint NOT NULL,
access  				int NOT NULL DEFAULT 0,
PRIMARY KEY (id)
);
