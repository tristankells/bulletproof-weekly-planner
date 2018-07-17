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
allocated_to        varchar(10) NOT NULL,
allocation_slot     int NOT NULL,
office_status       int default 0,
time_allocated      timestamp NOT NULL default current_timestamp ON UPDATE current_timestamp,
PRIMARY KEY (consultant_id, allocation_slot)
);

CREATE TABLE monthly_allocation (
    consultant_id       bigint NOT NULL REFERENCES consultant(id),
    client_id           bigint NOT NULL REFERENCES client(id),
    allocation_slot     int NOT NULL,
    time_allocated      timestamp NOT NULL default current_timestamp ON UPDATE current_timestamp,
    PRIMARY KEY (consultant_id, allocation_slot)
);

CREATE TABLE user_profile (
id   	     bigint NOT NULL AUTO_INCREMENT,
first_name     varchar(30) NOT NULL,
last_name      varchar(30),
username 	           varchar(50),
login_password      varchar(50),
email               varchar(50) UNIQUE,        
PRIMARY KEY (id)
);


create TABLE membership (
id 		        	    bigint NOT NULL AUTO_INCREMENT,
user_profile_id         bigint NOT NULL REFERENCES user_profile(id),
board_id	    		bigint NOT NULL,
access  				int,
PRIMARY KEY (id)
);





/*
EXAMPLE OF NON AUTO ID TABLE STRUCTURE

CREATE TABLE board (
id 		            bigint NOT NULL AUTO_INCREMENT,
name 	            varchar(100) NOT NULL,
description         text,
PRIMARY KEY (id)
);

CREATE TABLE consultant (
full_name       varchar(30),
job_title       varchar(30),
board_id        bigint NOT NULL REFERENCES board(id),
board_position  int,
PRIMARY KEY (full_name, board_id)
);

CREATE TABLE client (
full_name           varchar(30),
abbreviation        varchar(10),
board_id            bigint REFERENCES board(id),
board_position      int,
CONSTRAINT unq_board_id_abbreviation UNIQUE(abbreviation, board_id),
PRIMARY KEY (full_name, board_id)
);

CREATE TABLE allocation (
board_id                bigint NOT NULL REFERENCES board(id),
consultant_full_name    bigint NOT NULL REFERENCES consultant(full_name),
client_abbreviation     bigint NOT NULL REFERENCES client(abbreviation),
allocation_slot         int NOT NULL,
office_status           int default 0,
time_allocated          timestamp NOT NULL default current_timestamp ON UPDATE current_timestamp,
PRIMARY KEY (consultant_full_name, allocation_slot)
);
*/