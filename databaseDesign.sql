DROP TABLE ALL_TASKS;
CREATE TABLE ALL_TASKS (
    Task_ID int PRIMARY KEY,
    Task_Name varchar(255),
    Task_Description varchar(255),
    Time_ReqTo_Complete int,
    Time_Spent int,
    Objective varchar(255),
    Task_Completed char(1) DEFAULT 'N' CHECK(Task_Completed IN( 'Y','N')) ,
    Task_Completed_Date date
);

INSERT INTO ALL_TASKS VALUES(1, 'Work on Project', 'JIRA like software to keep track of things', 200, 4,
'Build an useful application from scratch', 'N', null);

SELECT * FROM ALL_TASKS;

CREATE TABLE DAYS_DATA (
    DAYS_DATA_ID INT PRIMARY KEY,
    DATE_VAL DATE,
    TASK_NAME VARCHAR(255),
    TASK_ID INT,
    PLANNED_TIME INT,
    TIME_SPENT INT,
    TASK_COMPLETED CHAR(1) CHECK(TASK_COMPLETED IN('Y','N')),
    FOREIGN KEY(TASK_ID) REFERENCES ALL_TASKS (TASK_ID)
);

INSERT INTO DAYS_DATA VALUES(1, '20-DEC-2019', 'Work On Project', 1, 5, 3, 'N');

SELECT * FROM DAYS_DATA;

alter table DAYS_DATA {
    TASK_COMPLETED CHAR(1) DEFAULT 'N' CHECK(TASK_COMPLETED IN('Y','N'))
};

alter table DAYS_DATA modify (TASK_COMPLETED DEFAULT 'N');
