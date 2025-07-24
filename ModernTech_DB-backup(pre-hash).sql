-- --------------------------------------------Database Creation: -----------------------------------------------

CREATE SCHEMA `moderntech_db` ;
USE `moderntech_db` ;

-- --------------------------------------------Users Table Creation: --------------------------------------------

CREATE TABLE `moderntech_db`.`users` (
  `EmployeeID` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(50) NOT NULL,
  `Position` VARCHAR(45) NOT NULL,
  `Department` VARCHAR(45) NOT NULL,
  `Salary` DECIMAL(7,2) NOT NULL,
  `EmploymentHistory` VARCHAR(60) NOT NULL,
  `Contact` VARCHAR(100) NOT NULL,
  `Username` VARCHAR(45) NOT NULL,
  `Password` VARCHAR(255) NULL,
  PRIMARY KEY (`EmployeeID`));

-- ------Inserting Data ------

INSERT INTO users (EmployeeID, Name, Position, Department, Salary, EmploymentHistory, Contact, Username, Password) 
VALUES (1, 'Sibongile Nkosi', 'Software Engineer', 'Development', 70000, 'Joined in 2015, promoted to Senior in 2018', 'sibongile.nkosi@moderntech.com', 'sibongile', NULL);
INSERT INTO users (EmployeeID, Name, Position, Department, Salary, EmploymentHistory, Contact, Username, Password) 
VALUES (2, 'Lungile Moyo', 'HR Manager', 'HR', 80000, 'Joined in 2013, promoted to Manager in 2017', 'lungile.moyo@moderntech.com', 'lungile', NULL);
INSERT INTO users (EmployeeID, Name, Position, Department, Salary, EmploymentHistory, Contact, Username, Password) 
VALUES (3, 'Thabo Molefe', 'Quality Analyst', 'QA', 55000, 'Joined in 2018', 'thabo.molefe@moderntech.com', 'thabo', NULL);
INSERT INTO users (EmployeeID, Name, Position, Department, Salary, EmploymentHistory, Contact, Username, Password) 
VALUES (4, 'Keshav Naidoo', 'Sales Representative', 'Sales', 60000, 'Joined in 2020', 'keshav.naidoo@moderntech.com', 'keshav', NULL);
INSERT INTO users (EmployeeID, Name, Position, Department, Salary, EmploymentHistory, Contact, Username, Password) 
VALUES (5, 'Zanele Khumalo', 'Marketing Specialist', 'Marketing', 58000, 'Joined in 2019', 'zanele.khumalo@moderntech.com', 'zanele', NULL);
INSERT INTO users (EmployeeID, Name, Position, Department, Salary, EmploymentHistory, Contact, Username, Password) 
VALUES (6, 'Sipho Zulu', 'UI/UX Designer', 'Design', 65000, 'Joined in 2016', 'sipho.zulu@moderntech.com', 'sipho', NULL);
INSERT INTO users (EmployeeID, Name, Position, Department, Salary, EmploymentHistory, Contact, Username, Password) 
VALUES (7, 'Naledi Moeketsi', 'DevOps Engineer', 'IT', 72000, 'Joined in 2017', 'naledi.moeketsi@moderntech.com', 'naledi', NULL);
INSERT INTO users (EmployeeID, Name, Position, Department, Salary, EmploymentHistory, Contact, Username, Password) 
VALUES (8, 'Farai Gumbo', 'Content Strategist', 'Marketing', 56000, 'Joined in 2021', 'farai.gumbo@moderntech.com', 'farai', NULL);
INSERT INTO users (EmployeeID, Name, Position, Department, Salary, EmploymentHistory, Contact, Username, Password)
VALUES (9, 'Karabo Dlamini', 'Accountant', 'Finance', 62000, 'Joined in 2018', 'karabo.dlamini@moderntech.com', 'karabo', NULL);
INSERT INTO users (EmployeeID, Name, Position, Department, Salary, EmploymentHistory, Contact, Username, Password) 
VALUES (10, 'Fatima Patel', 'Customer Support Lead', 'Support', 58000, 'Joined in 2016', 'fatima.patel@moderntech.com', 'fatima', NULL);

-- --------------------------------------------------------------------------------------------------------------

-- --------------------------------------------------Review Table Creation: -------------------------------------

CREATE TABLE `moderntech_db`.`reviews` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `EmployeeID` INT NOT NULL,
  `Reviewer` VARCHAR(45) NOT NULL,
  `Rating` TINYINT UNSIGNED NOT NULL CHECK (`Rating` BETWEEN 1 AND 5),
  `Comments` VARCHAR(255) NOT NULL,
  `Date` DATE NOT NULL,
  PRIMARY KEY (`ID`));

-- ------Foreign Key Creation ------

ALTER TABLE `moderntech_db`.`reviews` 
ADD INDEX `FKReview_idx` (`EmployeeID` ASC) VISIBLE;
;
ALTER TABLE `moderntech_db`.`reviews` 
ADD CONSTRAINT `FKReview`
  FOREIGN KEY (`EmployeeID`)
  REFERENCES `moderntech_db`.`users` (`EmployeeID`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

-- ------Inserting Data ------
  
INSERT INTO reviews (Id, EmployeeID, Reviewer, Rating, Comments, Date) VALUES (1, 1, 'Lungile Moyo', 5, 'Sibongile has excellent work ethic and collaborates well with the team.', '2024-06-01');
INSERT INTO reviews (Id, EmployeeID, Reviewer, Rating, Comments, Date) VALUES (2, 2, 'HR Director', 4, 'Lungile has demonstrated strong leadership in handling complex HR issues and improving employee morale.', '2024-05-15');
INSERT INTO reviews (Id, EmployeeID, Reviewer, Rating, Comments, Date) VALUES (3, 3, 'Sibongile Nkosi', 3, 'Thabo pays great attention to detail but sometimes delays test reporting.', '2024-06-10');
INSERT INTO reviews (Id, EmployeeID, Reviewer, Rating, Comments, Date) VALUES (4, 4, 'Marketing Manager', 4, 'Keshav has exceeded his sales targets for two consecutive quarters.', '2024-06-05');
INSERT INTO reviews (Id, EmployeeID, Reviewer, Rating, Comments, Date) VALUES (5, 5, 'Team Lead', 4, 'Zanele brings creative marketing strategies and strong execution.', '2024-06-12');
INSERT INTO reviews (Id, EmployeeID, Reviewer, Rating, Comments, Date) VALUES (6, 6, 'Design Lead', 5, 'Sipho designs clean and user-friendly interfaces.', '2024-06-03');
INSERT INTO reviews (Id, EmployeeID, Reviewer, Rating, Comments, Date) VALUES (7, 7, 'CTO', 5, 'Naledi ensures infrastructure is always up and running with high efficiency.', '2024-06-08');
INSERT INTO reviews (Id, EmployeeID, Reviewer, Rating, Comments, Date) VALUES (8, 8, 'Marketing Lead', 3, 'Farai is improving in content planning but needs to meet deadlines more consistently.', '2024-05-30');
INSERT INTO reviews (Id, EmployeeID, Reviewer, Rating, Comments, Date) VALUES (9, 9, 'Finance Manager', 4, 'Karabo handles financial reporting accurately and meets tight deadlines.', '2024-06-04');
INSERT INTO reviews (Id, EmployeeID, Reviewer, Rating, Comments, Date) VALUES (10, 10, 'Support Manager', 5, 'Fatima leads the support team with professionalism and ensures high client satisfaction.', '2024-06-06');

-- ------------------------------------------------------------------------------------------------------------------

-- -----------------------------------------Attendance Table Creation: ----------------------------------------------

CREATE TABLE `moderntech_db`.`attendance` (
  `EmployeeID` INT NOT NULL,
  `Name` VARCHAR(45) NOT NULL,
  `Date` Date NOT NULL,
  `Status` VARCHAR(7) NOT NULL);

-- ------Foreign Key Creation ------
  
ALTER TABLE `moderntech_db`.`attendance` 
ADD CONSTRAINT `FKAttendance`
  FOREIGN KEY (`EmployeeID`)
  REFERENCES `moderntech_db`.`users` (`EmployeeID`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

 
 -- ------Inserting Data ------
  
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

-- ----------------------------------------------------------------------------------------------------------------------

-- -------------------------------------------Leave Requests Table Creation: --------------------------------------------

  CREATE TABLE `moderntech_db`.`leave_requests` (
  `EmployeeID` INT NOT NULL,
  `Date` DATE NULL,
  `Reason` VARCHAR(60) NULL,
  `Status` VARCHAR(10) NULL);
 
 -- ------Foreign Key Creation ------
 
ALTER TABLE `moderntech_db`.`leave_requests` 
ADD INDEX `FKLeave_idx` (`EmployeeID` ASC) VISIBLE;
;
ALTER TABLE `moderntech_db`.`leave_requests` 
ADD CONSTRAINT `FKLeave`
  FOREIGN KEY (`EmployeeID`)
  REFERENCES `moderntech_db`.`users` (`EmployeeID`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

-- ------Inserting Data ------

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

-- ----------------------------------------------------------------------------------------------------------------------

-- -------------------------------------------Salaries Table Creation: --------------------------------------------

CREATE TABLE `moderntech_db`.`salaries` (
  `EmployeeID` INT NOT NULL,
  `HoursWorked` INT NOT NULL,
  `LeaveDeductions` INT NOT NULL,
  `FinalSalary` DECIMAL(7,2) NOT NULL);

 -- ------Foreign Key Creation ------
  
ALTER TABLE `moderntech_db`.`salaries` 
ADD INDEX `FKSalary_idx` (`EmployeeID` ASC) VISIBLE;
;
ALTER TABLE `moderntech_db`.`salaries` 
ADD CONSTRAINT `FKSalary`
  FOREIGN KEY (`EmployeeID`)
  REFERENCES `moderntech_db`.`users` (`EmployeeID`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;
  

-- ------Inserting Data ------
  
INSERT INTO salaries (EmployeeID, HoursWorked, LeaveDeductions, FinalSalary) VALUES (1, 160, 8, 69500);
INSERT INTO salaries (EmployeeID, HoursWorked, LeaveDeductions, FinalSalary) VALUES (2, 150, 10, 79000);
INSERT INTO salaries (EmployeeID, HoursWorked, LeaveDeductions, FinalSalary) VALUES (3, 170, 4, 54800);
INSERT INTO salaries (EmployeeID, HoursWorked, LeaveDeductions, FinalSalary) VALUES (4, 165, 6, 59700);
INSERT INTO salaries (EmployeeID, HoursWorked, LeaveDeductions, FinalSalary) VALUES (5, 158, 5, 57850);
INSERT INTO salaries (EmployeeID, HoursWorked, LeaveDeductions, FinalSalary) VALUES (6, 168, 2, 64800);
INSERT INTO salaries (EmployeeID, HoursWorked, LeaveDeductions, FinalSalary) VALUES (7, 175, 3, 71800);
INSERT INTO salaries (EmployeeID, HoursWorked, LeaveDeductions, FinalSalary) VALUES (8, 160, 0, 56000);
INSERT INTO salaries (EmployeeID, HoursWorked, LeaveDeductions, FinalSalary) VALUES (9, 155, 5, 61500);
INSERT INTO salaries (EmployeeID, HoursWorked, LeaveDeductions, FinalSalary) VALUES (10, 162, 4, 57750);

