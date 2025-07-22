CREATE SCHEMA `moderntech_db` ;


ALTER TABLE `moderntech_db`.`reviews` 
ADD INDEX `reviewsFK_idx` (`EmployeeID` ASC) VISIBLE;
;
ALTER TABLE `moderntech_db`.`reviews` 
ADD CONSTRAINT `reviewsFK`
  FOREIGN KEY (`EmployeeID`)
  REFERENCES `moderntech_db`.`users` (`EmployeeID`)
  ON DELETE NO ACTION
  ON UPDate NO ACTION;

CREATE TABLE `moderntech_db`.`attendance` (
  `EmployeeID` INT NOT NULL,
  `Name` VARCHAR(45) NOT NULL,
  `Date` Date NOT NULL,
  `Status` VARCHAR(7) NOT NULL);
  
  ALTER TABLE `moderntech_db`.`attendance` 
ADD INDEX `attendanceFK_idx` (`EmployeeID` ASC) VISIBLE;
;
ALTER TABLE `moderntech_db`.`attendance` 
ADD CONSTRAINT `attendanceFK`
  FOREIGN KEY (`EmployeeID`)
  REFERENCES `moderntech_db`.`users` (`EmployeeID`)
  ON DELETE NO ACTION
  ON UPDate NO ACTION;
  
  CREATE TABLE `moderntech_db`.`leave_requests` (
  `EmployeeID` INT NOT NULL,
  `Date` DATE NULL,
  `Reason` VARCHAR(60) NULL,
  `Status` VARCHAR(10) NULL);
  
  ALTER TABLE `moderntech_db`.`leave_requests` 
ADD INDEX `leaveFK_idx` (`EmployeeID` ASC) VISIBLE;
;
ALTER TABLE `moderntech_db`.`leave_requests` 
ADD CONSTRAINT `leaveFK`
  FOREIGN KEY (`EmployeeID`)
  REFERENCES `moderntech_db`.`users` (`EmployeeID`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;



INSERT INTO attendance (EmployeeID, Name, Date, Status) VALUES (1, 'Sibongile Nkosi', '2025-07-25', 'Present');
INSERT INTO attendance (EmployeeID, Name, Date, Status) VALUES (1, 'Sibongile Nkosi', '2025-07-26', 'Absent');
INSERT INTO attendance (EmployeeID, Name, Date, Status) VALUES (1, 'Sibongile Nkosi', '2025-07-27', 'Present');
INSERT INTO attendance (EmployeeID, Name, Date, Status) VALUES (1, 'Sibongile Nkosi', '2025-07-28', 'Present');
INSERT INTO attendance (EmployeeID, Name, Date, Status) VALUES (1, 'Sibongile Nkosi', '2025-07-29', 'Present');

INSERT INTO attendance (EmployeeID, Name, Date, Status) VALUES (2, 'Lungile Moyo', '2025-07-25', 'Present');
INSERT INTO attendance (EmployeeID, Name, Date, Status) VALUES (2, 'Lungile Moyo', '2025-07-26', 'Present');
INSERT INTO attendance (EmployeeID, Name, Date, Status) VALUES (2, 'Lungile Moyo', '2025-07-27', 'Absent');
INSERT INTO attendance (EmployeeID, Name, Date, Status) VALUES (2, 'Lungile Moyo', '2025-07-28', 'Present');
INSERT INTO attendance (EmployeeID, Name, Date, Status) VALUES (2, 'Lungile Moyo', '2025-07-29', 'Present');

INSERT INTO attendance (EmployeeID, Name, Date, Status) VALUES (3, 'Thabo Molefe', '2025-07-25', 'Present');
INSERT INTO attendance (EmployeeID, Name, Date, Status) VALUES (3, 'Thabo Molefe', '2025-07-26', 'Present');
INSERT INTO attendance (EmployeeID, Name, Date, Status) VALUES (3, 'Thabo Molefe', '2025-07-27', 'Present');
INSERT INTO attendance (EmployeeID, Name, Date, Status) VALUES (3, 'Thabo Molefe', '2025-07-28', 'Absent');
INSERT INTO attendance (EmployeeID, Name, Date, Status) VALUES (3, 'Thabo Molefe', '2025-07-29', 'Present');

INSERT INTO attendance (EmployeeID, Name, Date, Status) VALUES (4, 'Keshav Naidoo', '2025-07-25', 'Absent');
INSERT INTO attendance (EmployeeID, Name, Date, Status) VALUES (4, 'Keshav Naidoo', '2025-07-26', 'Present');
INSERT INTO attendance (EmployeeID, Name, Date, Status) VALUES (4, 'Keshav Naidoo', '2025-07-27', 'Present');
INSERT INTO attendance (EmployeeID, Name, Date, Status) VALUES (4, 'Keshav Naidoo', '2025-07-28', 'Present');
INSERT INTO attendance (EmployeeID, Name, Date, Status) VALUES (4, 'Keshav Naidoo', '2025-07-29', 'Present');

INSERT INTO attendance (EmployeeID, Name, Date, Status) VALUES (5, 'Zanele Khumalo', '2025-07-25', 'Present');
INSERT INTO attendance (EmployeeID, Name, Date, Status) VALUES (5, 'Zanele Khumalo', '2025-07-26', 'Present');
INSERT INTO attendance (EmployeeID, Name, Date, Status) VALUES (5, 'Zanele Khumalo', '2025-07-27', 'Absent');
INSERT INTO attendance (EmployeeID, Name, Date, Status) VALUES (5, 'Zanele Khumalo', '2025-07-28', 'Present');
INSERT INTO attendance (EmployeeID, Name, Date, Status) VALUES (5, 'Zanele Khumalo', '2025-07-29', 'Present');

INSERT INTO attendance (EmployeeID, Name, Date, Status) VALUES (6, 'Sipho Zulu', '2025-07-25', 'Present');
INSERT INTO attendance (EmployeeID, Name, Date, Status) VALUES (6, 'Sipho Zulu', '2025-07-26', 'Present');
INSERT INTO attendance (EmployeeID, Name, Date, Status) VALUES (6, 'Sipho Zulu', '2025-07-27', 'Absent');
INSERT INTO attendance (EmployeeID, Name, Date, Status) VALUES (6, 'Sipho Zulu', '2025-07-28', 'Present');
INSERT INTO attendance (EmployeeID, Name, Date, Status) VALUES (6, 'Sipho Zulu', '2025-07-29', 'Present');

INSERT INTO attendance (EmployeeID, Name, Date, Status) VALUES (7, 'Naledi Moeketsi', '2025-07-25', 'Present');
INSERT INTO attendance (EmployeeID, Name, Date, Status) VALUES (7, 'Naledi Moeketsi', '2025-07-26', 'Present');
INSERT INTO attendance (EmployeeID, Name, Date, Status) VALUES (7, 'Naledi Moeketsi', '2025-07-27', 'Present');
INSERT INTO attendance (EmployeeID, Name, Date, Status) VALUES (7, 'Naledi Moeketsi', '2025-07-28', 'Absent');
INSERT INTO attendance (EmployeeID, Name, Date, Status) VALUES (7, 'Naledi Moeketsi', '2025-07-29', 'Present');

INSERT INTO attendance (EmployeeID, Name, Date, Status) VALUES (8, 'Farai Gumbo', '2025-07-25', 'Present');
INSERT INTO attendance (EmployeeID, Name, Date, Status) VALUES (8, 'Farai Gumbo', '2025-07-26', 'Absent');
INSERT INTO attendance (EmployeeID, Name, Date, Status) VALUES (8, 'Farai Gumbo', '2025-07-27', 'Present');
INSERT INTO attendance (EmployeeID, Name, Date, Status) VALUES (8, 'Farai Gumbo', '2025-07-28', 'Present');
INSERT INTO attendance (EmployeeID, Name, Date, Status) VALUES (8, 'Farai Gumbo', '2025-07-29', 'Present');

INSERT INTO attendance (EmployeeID, Name, Date, Status) VALUES (9, 'Karabo Dlamini', '2025-07-25', 'Present');
INSERT INTO attendance (EmployeeID, Name, Date, Status) VALUES (9, 'Karabo Dlamini', '2025-07-26', 'Present');
INSERT INTO attendance (EmployeeID, Name, Date, Status) VALUES (9, 'Karabo Dlamini', '2025-07-27', 'Present');
INSERT INTO attendance (EmployeeID, Name, Date, Status) VALUES (9, 'Karabo Dlamini', '2025-07-28', 'Absent');
INSERT INTO attendance (EmployeeID, Name, Date, Status) VALUES (9, 'Karabo Dlamini', '2025-07-29', 'Present');

INSERT INTO attendance (EmployeeID, Name, Date, Status) VALUES (10, 'Fatima Patel', '2025-07-25', 'Present');
INSERT INTO attendance (EmployeeID, Name, Date, Status) VALUES (10, 'Fatima Patel', '2025-07-26', 'Present');
INSERT INTO attendance (EmployeeID, Name, Date, Status) VALUES (10, 'Fatima Patel', '2025-07-27', 'Absent');
INSERT INTO attendance (EmployeeID, Name, Date, Status) VALUES (10, 'Fatima Patel', '2025-07-28', 'Present');
INSERT INTO attendance (EmployeeID, Name, Date, Status) VALUES (10, 'Fatima Patel', '2025-07-29', 'Present');

INSERT INTO leave_requests (EmployeeId, Date, Reason, Status) VALUES (1, '2025-07-22', 'Sick Leave', 'Approved');
INSERT INTO leave_requests (EmployeeId, Date, Reason, Status) VALUES (1, '2024-12-01', 'Personal', 'Pending');

INSERT INTO leave_requests (EmployeeId, Date, Reason, Status) VALUES (2, '2025-07-15', 'Family Responsibility', 'Denied');
INSERT INTO leave_requests (EmployeeId, Date, Reason, Status) VALUES (2, '2024-12-02', 'Vacation', 'Approved');

INSERT INTO leave_requests (EmployeeId, Date, Reason, Status) VALUES (3, '2025-07-10', 'Medical Appointment', 'Approved');
INSERT INTO leave_requests (EmployeeId, Date, Reason, Status) VALUES (3, '2024-12-05', 'Personal', 'Pending');

INSERT INTO leave_requests (EmployeeId, Date, Reason, Status) VALUES (4, '2025-07-20', 'Bereavement', 'Approved');

INSERT INTO leave_requests (EmployeeId, Date, Reason, Status) VALUES (5, '2024-12-01', 'Childcare', 'Pending');

INSERT INTO leave_requests (EmployeeId, Date, Reason, Status) VALUES (6, '2025-07-18', 'Sick Leave', 'Approved');

INSERT INTO leave_requests (EmployeeId, Date, Reason, Status) VALUES (7, '2025-07-22', 'Vacation', 'Pending');

INSERT INTO leave_requests (EmployeeId, Date, Reason, Status) VALUES (8, '2024-12-02', 'Medical Appointment', 'Approved');

INSERT INTO leave_requests (EmployeeId, Date, Reason, Status) VALUES (9, '2025-07-19', 'Childcare', 'Denied');

INSERT INTO leave_requests (EmployeeId, Date, Reason, Status) VALUES (10, '2024-12-03', 'Vacation', 'Pending');

