INSERT INTO board (name, description)
values ('Bulletproof Auckland','Bulletproof Auckland');



INSERT INTO client (full_name, abbreviation, board_id, board_position)
values ('Bulletproof','BUL',1,1);

INSERT INTO client (full_name, abbreviation, board_id, board_position)
values ('Wednesdays','WED',1,2);



INSERT INTO consultant (full_name, job_title,board_id,board_position)
values ('Dan Wood','Tester',1,1);

INSERT INTO consultant (full_name, job_title,board_id,board_position)
values ('Tristan Kells','Developer',1,2);



INSERT INTO allocation (consultant_id, allocated_to,allocation_slot,office_status )
values (1,"BUL",1,0);

INSERT INTO allocation (consultant_id, allocated_to,allocation_slot,office_status )
values (2,"WED",5,1);



INSERT INTO monthly_allocation (consultant_id, client_id,allocation_slot)
values (1,1,1);

INSERT INTO monthly_allocation (consultant_id, client_id,allocation_slot)
values (2,2,2);