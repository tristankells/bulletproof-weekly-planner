CREATE TABLE board (
id 		        bigint NOT NULL AUTO_INCREMENT,
name 	        varchar(100) NOT NULL,
description     text,
PRIMARY KEY (id)
);


CREATE TABLE client (
id          bigint NOT NULL AUTO_INCREMENT,
full_name   varchar(30),
abbrevation varchar(3),
PRIMARY KEY (id)
);

CREATE TABLE consultant (
id bigint NOT NULL AUTO_INCREMENT,
full_name  varchar(30),
job_title varchar(30),
PRIMARY KEY (id)
);



CREATE TABLE allocation (
id bigint NOT NULL AUTO_INCREMENT,
consultant_id bigint NOT NULL,
allocated_to varchar(10) NOT NULL,
allocation_slot int NOT NULL,
office_status int default 0,
time_allocated timestamp not null default current_timestamp on update current_timestamp,
PRIMARY KEY (id),
FOREIGN KEY (consultant_id) REFERENCES consultant(id),
CONSTRAINT unq_consultant_id_allocation_slot UNIQUE(consultant_id, allocation_slot)
);

CREATE TABLE board_consultant (
id bigint NOT NULL AUTO_INCREMENT,
board_id bigint,
consultant_id bigint,
position int,
PRIMARY KEY (id),
FOREIGN KEY (consultant_id) REFERENCES consultant(id),
FOREIGN KEY (board_id) REFERENCES board(id)
);

CREATE TABLE board_client (
id bigint NOT NULL AUTO_INCREMENT,
board_id bigint,
client_id bigint,
position int,
PRIMARY KEY (id),
FOREIGN KEY (client_id) REFERENCES client(id),
FOREIGN KEY (board_id) REFERENCES board(id)
);
