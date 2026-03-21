-- User Story 1 — Database Setup (DDL)
-- 1.Create a Database
create database TechNova;
use TechNova;
-- 2.Creating tables
-- Department table
create table Department(
 DeptId int PRIMARY KEY,
 DeptName varchar(50) NOT NULL UNIQUE,
 Location varchar(50) NOT NULL
 );
 -- Employee table
 create table Employee(
 EmpId int PRIMARY KEY,
 EmpName varchar(50) NOT NULL,
 Gender ENUM('M','F') NOT NULL,
 DOB DATE NOT NULL,
 HireDate DATE NOT NULL,
 DeptID int,
 FOREIGN KEY(DeptID) references Department(DeptId)
 );
 -- Project table
 create table Project(
 ProjectID int PRIMARY KEY,
 ProjectName varchar(50) NOT NULL,
 DeptID int , 
 StartDate DATE,
 EndDate date,
 FOREIGN KEY(DeptID) references Department(DeptId)
 );
 -- Performance table
 create table Performance(
 EmpID int ,
 ProjectID int , 
 Rating decimal(3,2) CHECK (Rating between 1 and 5),
 ReviewDate DATE,
PRIMARY KEY (EmpID, ProjectID),
FOREIGN KEY (EmpID) REFERENCES Employee(EmpID),
FOREIGN KEY (ProjectID) REFERENCES Project(ProjectID)
);
-- Reward table
CREATE TABLE Reward (
    EmpID INT,
    RewardMonth DATE,
    RewardAmount DECIMAL(10,2),
    PRIMARY KEY (EmpID, RewardMonth),
    FOREIGN KEY (EmpID) REFERENCES Employee(EmpID)
);
 show indexes from Department;
 CREATE INDEX idx_empname ON Employee(EmpName);
  CREATE INDEX idx_deptid ON Employee(DeptID);
 
-- User Story 2 — Insert and Manage Data (DML)
-- Insert Departments
INSERT INTO Department VALUES
(101,'IT','Bangalore'),
(102,'HR','Delhi'),
(103,'Finance','Mumbai'),
(104,'Marketing','Chennai'),
(105,'Operations','Hyderabad');

-- Insert Employees
INSERT INTO Employee VALUES
(1,'Asha','F','1990-07-12','2018-06-10',101),
(2,'Raj','M','1988-04-09','2020-03-22',102),
(3,'Neha','F','1995-01-15','2021-08-05',101),
(4,'Arjun','M','1992-11-20','2019-02-14',103),
(5,'Priya','F','1993-09-30','2022-01-18',104);

-- Insert Projects
INSERT INTO Project VALUES
(201,'Payroll System',101,'2022-01-01','2022-06-01'),
(202,'Recruitment Portal',102,'2023-02-01','2023-07-01'),
(203,'Budget Analysis',103,'2022-03-01','2022-09-01'),
(204,'Marketing Campaign',104,'2023-01-15','2023-08-01'),
(205,'Automation Tool',101,'2024-01-01','2024-12-31');

-- Insert Performance
INSERT INTO Performance VALUES
(1,201,4.5,'2022-06-10'),
(2,202,4.2,'2023-07-05'),
(3,205,4.8,'2024-12-20'),
(4,203,3.9,'2022-09-15'),
(5,204,4.6,'2023-08-10');

-- Insert Rewards
INSERT INTO Reward VALUES
(1,'2024-01-01',3000),
(2,'2024-02-01',1500),
(3,'2024-03-01',2500),
(4,'2024-04-01',900),
(5,'2024-05-01',4000);

-- Update one employee department
UPDATE Employee SET DeptID = 105 WHERE EmpID=5;
SET SQL_SAFE_UPDATES = 0;
-- Delete reward less than 1000
DELETE FROM Reward WHERE RewardAmount <1000;

-- User Story 3 — Generate Insights (DQL, Aggregate and Date Functions)
-- 1. Employees joined after 2019-01-01
SELECT *  FROM Employee WHERE HireDate > '2019-01-01';

-- 2. Average performance rating per department
SELECT d.DeptName, AVG(p.Rating) AS AvgRating FROM Employee e
JOIN Department d ON e.DeptID = d.DeptID
JOIN Performance p ON e.EmpID = p.EmpID
GROUP BY d.DeptName;

-- 3. Employees with age
SELECT EmpName, TIMESTAMPDIFF(YEAR, DOB, CURDATE()) AS Age FROM Employee;
-- 4. Total rewards in current year
SELECT SUM(RewardAmount) AS TotalRewards FROM Reward
WHERE YEAR(RewardMonth) = YEAR(CURDATE());
-- 5. Employees with rewards > 2000
SELECT e.EmpName, r.RewardAmount
FROM Employee e
JOIN Reward r ON e.EmpID = r.EmpID
WHERE r.RewardAmount > 2000;

-- User Story 4 — Advanced Queries (Joins and Subqueries)
-- 1. Employee, Department, Project, Rating
SELECT e.EmpName, d.DeptName, pr.ProjectName, p.Rating
FROM Employee e
JOIN Department d ON e.DeptID = d.DeptID
JOIN Performance p ON e.EmpID = p.EmpID
JOIN Project pr ON p.ProjectID = pr.ProjectID;

-- 2. Highest-rated employee in each department
SELECT e.EmpName, d.DeptName, p.Rating FROM Employee e
JOIN Department d ON e.DeptID = d.DeptID
JOIN Performance p ON e.EmpID = p.EmpID
WHERE p.Rating = (
    SELECT MAX(p2.Rating)
    FROM Employee e2
    JOIN Performance p2 ON e2.EmpID = p2.EmpID
    WHERE e2.DeptID = e.DeptID
);
-- 3. Employees with no rewards
SELECT EmpName FROM Employee
WHERE EmpID NOT IN (SELECT EmpID FROM Reward);

-- User Story 5 — Transaction Control and Optimization
-- 1. Begin Transaction
START TRANSACTION;
INSERT INTO Employee VALUES
(6,'Kiran','M','1996-05-10','2024-06-01',101);
INSERT INTO Performance VALUES
(6,205,4.3,'2024-12-25');
-- If everything OK
COMMIT;
-- If error occurs
-- ROLLBACK;
SHOW INDEX FROM Employee;
EXPLAIN
SELECT e.EmpName, d.DeptName, pr.ProjectName, p.Rating
FROM Employee e
JOIN Department d ON e.DeptID = d.DeptID
JOIN Performance p ON e.EmpID = p.EmpID
JOIN Project pr ON p.ProjectID = pr.ProjectID;

CREATE INDEX idx_emp_deptid ON Employee(DeptID);
CREATE INDEX idx_perf_empid ON Performance(EmpID);
CREATE INDEX idx_perf_projectid ON Performance(ProjectID);

EXPLAIN
SELECT e.EmpName, d.DeptName, pr.ProjectName, p.Rating
FROM Employee e
JOIN Department d ON e.DeptID = d.DeptID
JOIN Performance p ON e.EmpID = p.EmpID
JOIN Project pr ON p.ProjectID = pr.ProjectID;