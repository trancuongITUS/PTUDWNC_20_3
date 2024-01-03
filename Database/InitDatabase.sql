/*============================== CREATE DATABASE STRUCTURE ==============================*/
/* table m_role */
CREATE TABLE IF NOT EXISTS m_role(
    id SERIAL
    , role_name character varying (50)
    , PRIMARY KEY (id)
);

/* table m_user */
CREATE TABLE IF NOT EXISTS m_user( 
    id SERIAL
    , username character varying (255) UNIQUE NOT NULL
    , pwd_hash character varying (255)
    , email character varying (255) UNIQUE NOT NULL
    , fullname character varying (255)
    , refresh_token character varying (255)
    , expired_refresh_token timestamp without time zone
    , is_google boolean default false
    , id_role integer
    , record_version integer DEFAULT 0
    , created_date timestamp without time zone
    , created_user integer
    , last_upd_date timestamp without time zone
    , last_upd_user integer
    , PRIMARY KEY (id)
);
ALTER TABLE m_user ADD CONSTRAINT created_user_fkey FOREIGN KEY (created_user) REFERENCES m_user(id);
ALTER TABLE m_user ADD CONSTRAINT last_upd_user_fkey FOREIGN KEY (last_upd_user) REFERENCES m_user(id);
ALTER TABLE m_user ADD CONSTRAINT id_role_fkey FOREIGN KEY (id_role) REFERENCES m_role(id);

/* table t_class */
CREATE TABLE IF NOT EXISTS t_class(
    id SERIAL
    , class_name character varying (50) NOT NULL
    , class_description character varying (255) NOT NULL
    , grade_scale numeric(20, 5) NOT NULL
    , record_version integer default 0
    , created_date timestamp without time zone
    , created_user integer
    , last_upd_date timestamp without time zone
    , last_upd_user integer
    , PRIMARY KEY (id)
);
ALTER TABLE t_class ADD CONSTRAINT created_user_fkey FOREIGN KEY (created_user) REFERENCES m_user(id);
ALTER TABLE t_class ADD CONSTRAINT last_upd_user_fkey FOREIGN KEY (last_upd_user) REFERENCES m_user(id);

/* table r_class_user - relation of t_class and m_user */
CREATE TABLE IF NOT EXISTS r_class_user(
    id_class integer
    , id_user integer
    , is_owner boolean default false
    , PRIMARY KEY (id_class, id_user)
);
ALTER TABLE r_class_user ADD CONSTRAINT id_class_fkey FOREIGN KEY (id_class) REFERENCES t_class(id);
ALTER TABLE r_class_user ADD CONSTRAINT id_user_fkey FOREIGN KEY (id_user) REFERENCES m_user(id);

/* table t_grade_composition */
CREATE TABLE IF NOT EXISTS t_grade_composition(
    id SERIAL
    , id_class integer
    , grade_name character varying(50) NOT NULL
    , grade_percent integer NOT NULL
    , record_version integer default 0
    , created_date timestamp without time zone
    , created_user integer
    , last_upd_date timestamp without time zone
    , last_upd_user integer
    , PRIMARY KEY (id)
);
ALTER TABLE t_grade_composition ADD CONSTRAINT id_class_fkey FOREIGN KEY (id_class) REFERENCES t_class(id);
ALTER TABLE t_grade_composition ADD CONSTRAINT created_user_fkey FOREIGN KEY (created_user) REFERENCES m_user(id);
ALTER TABLE t_grade_composition ADD CONSTRAINT last_upd_user_fkey FOREIGN KEY (last_upd_user) REFERENCES m_user(id);

/* table r_class_student_grade - relation of t_class, m_user(student), t_grade_composition */
CREATE TABLE IF NOT EXISTS r_class_student_grade(
    id_class integer
    , id_student integer
    , id_grade_composition integer
    , grade numeric(20, 5)
    , PRIMARY KEY (id_class, id_student, id_grade_composition)
);
ALTER TABLE r_class_student_grade ADD CONSTRAINT id_class_fkey FOREIGN KEY (id_class) REFERENCES t_class(id);
ALTER TABLE r_class_student_grade ADD CONSTRAINT id_student_fkey FOREIGN KEY (id_student) REFERENCES m_user(id);
ALTER TABLE r_class_student_grade ADD CONSTRAINT id_grade_composition_fkey FOREIGN KEY (id_grade_composition) REFERENCES t_grade_composition(id);

/*============================== INSERT DATA FOR DATABASE ==============================*/
INSERT INTO m_role (role_name) VALUES
    ('Admin')
    , ('Student')
    , ('Teacher');

INSERT INTO m_user (username, pwd_hash, email, id_role, created_user, created_date, last_upd_user, last_upd_date)
VALUES 
    ('admin', '$2b$10$.URsBQWkf4hAGOnQWqRduOxWg6on0St2XRZJ7o54.LGsEN.DaT/sO', 'admin@gmail.com', 1, 1, CURRENT_TIMESTAMP, 1, CURRENT_TIMESTAMP)
    , ('teacher1', '$2b$10$.URsBQWkf4hAGOnQWqRduOxWg6on0St2XRZJ7o54.LGsEN.DaT/sO', 'teacher1@email.com', (SELECT id FROM m_role WHERE role_name = 'Teacher'), 1, CURRENT_TIMESTAMP, 1, CURRENT_TIMESTAMP)
    , ('teacher2', '$2b$10$.URsBQWkf4hAGOnQWqRduOxWg6on0St2XRZJ7o54.LGsEN.DaT/sO', 'teacher2@email.com', (SELECT id FROM m_role WHERE role_name = 'Teacher'), 1, CURRENT_TIMESTAMP, 1, CURRENT_TIMESTAMP)
    , ('teacher3', '$2b$10$.URsBQWkf4hAGOnQWqRduOxWg6on0St2XRZJ7o54.LGsEN.DaT/sO', 'teacher3@email.com', (SELECT id FROM m_role WHERE role_name = 'Teacher'), 1, CURRENT_TIMESTAMP, 1, CURRENT_TIMESTAMP)
    , ('student1', '$2b$10$.URsBQWkf4hAGOnQWqRduOxWg6on0St2XRZJ7o54.LGsEN.DaT/sO', 'student1@email.com', (SELECT id FROM m_role WHERE role_name = 'Student'), 1, CURRENT_TIMESTAMP, 1, CURRENT_TIMESTAMP)
    , ('student2', '$2b$10$.URsBQWkf4hAGOnQWqRduOxWg6on0St2XRZJ7o54.LGsEN.DaT/sO', 'student2@email.com', (SELECT id FROM m_role WHERE role_name = 'Student'), 1, CURRENT_TIMESTAMP, 1, CURRENT_TIMESTAMP)
    , ('student3', '$2b$10$.URsBQWkf4hAGOnQWqRduOxWg6on0St2XRZJ7o54.LGsEN.DaT/sO', 'student3@email.com', (SELECT id FROM m_role WHERE role_name = 'Student'), 1, CURRENT_TIMESTAMP, 1, CURRENT_TIMESTAMP)
    , ('student4', '$2b$10$.URsBQWkf4hAGOnQWqRduOxWg6on0St2XRZJ7o54.LGsEN.DaT/sO', 'student4@email.com', (SELECT id FROM m_role WHERE role_name = 'Student'), 1, CURRENT_TIMESTAMP, 1, CURRENT_TIMESTAMP)
    , ('student5', '$2b$10$.URsBQWkf4hAGOnQWqRduOxWg6on0St2XRZJ7o54.LGsEN.DaT/sO', 'student5@email.com', (SELECT id FROM m_role WHERE role_name = 'Student'), 1, CURRENT_TIMESTAMP, 1, CURRENT_TIMESTAMP)
    , ('student6', '$2b$10$.URsBQWkf4hAGOnQWqRduOxWg6on0St2XRZJ7o54.LGsEN.DaT/sO', 'student6@email.com', (SELECT id FROM m_role WHERE role_name = 'Student'), 1, CURRENT_TIMESTAMP, 1, CURRENT_TIMESTAMP)
    , ('student7', '$2b$10$.URsBQWkf4hAGOnQWqRduOxWg6on0St2XRZJ7o54.LGsEN.DaT/sO', 'student7@email.com', (SELECT id FROM m_role WHERE role_name = 'Student'), 1, CURRENT_TIMESTAMP, 1, CURRENT_TIMESTAMP);

INSERT INTO t_class (class_name, class_description, grade_scale, created_user, created_date, last_upd_user, last_upd_date)
VALUES 
    ('Class 1', 'Description for Class 1', 100, 1, CURRENT_TIMESTAMP, 1, CURRENT_TIMESTAMP)
    , ('Class 2', 'Description for Class 2', 100, 1, CURRENT_TIMESTAMP, 1, CURRENT_TIMESTAMP)
    , ('Class 3', 'Description for Class 3', 100, 1, CURRENT_TIMESTAMP, 1, CURRENT_TIMESTAMP);

INSERT INTO r_class_user (id_class, id_user, is_owner)
VALUES
    (1, (SELECT id FROM m_user WHERE username = 'teacher1'), true)
    , (1, (SELECT id FROM m_user WHERE username = 'student1'), false)
    , (1, (SELECT id FROM m_user WHERE username = 'student2'), false)
    , (1, (SELECT id FROM m_user WHERE username = 'student3'), false)
    , (1, (SELECT id FROM m_user WHERE username = 'student4'), false)
    , (2, (SELECT id FROM m_user WHERE username = 'teacher2'), true)
    , (2, (SELECT id FROM m_user WHERE username = 'student5'), false)
    , (2, (SELECT id FROM m_user WHERE username = 'student6'), false)
    , (2, (SELECT id FROM m_user WHERE username = 'student7'), false)
    , (3, (SELECT id FROM m_user WHERE username = 'teacher3'), true)
    , (3, (SELECT id FROM m_user WHERE username = 'student3'), false)
    , (3, (SELECT id FROM m_user WHERE username = 'student4'), false)
    , (3, (SELECT id FROM m_user WHERE username = 'student5'), false)
    , (3, (SELECT id FROM m_user WHERE username = 'student6'), false);

INSERT INTO t_grade_composition (id_class, grade_name, grade_percent, created_user, created_date, last_upd_user, last_upd_date)
VALUES (1, 'Assignment', 20, 1, CURRENT_TIMESTAMP, 1, CURRENT_TIMESTAMP)
    , (1, 'Midterm', 30, 1, CURRENT_TIMESTAMP, 1, CURRENT_TIMESTAMP)
    , (1, 'Final', 50, 1, CURRENT_TIMESTAMP, 1, CURRENT_TIMESTAMP)
    , (2, 'Assignment', 20, 1, CURRENT_TIMESTAMP, 1, CURRENT_TIMESTAMP)
    , (2, 'Midterm', 30, 1, CURRENT_TIMESTAMP, 1, CURRENT_TIMESTAMP)
    , (2, 'Final', 50, 1, CURRENT_TIMESTAMP, 1, CURRENT_TIMESTAMP)
    , (3, 'Assignment', 20, 1, CURRENT_TIMESTAMP, 1, CURRENT_TIMESTAMP)
    , (3, 'Midterm', 30, 1, CURRENT_TIMESTAMP, 1, CURRENT_TIMESTAMP)
    , (3, 'Final', 50, 1, CURRENT_TIMESTAMP, 1, CURRENT_TIMESTAMP);

INSERT INTO r_class_student_grade (id_class, id_student, id_grade_composition, grade)
VALUES (1, (SELECT id FROM m_user WHERE username = 'student1'), (SELECT id FROM t_grade_composition WHERE grade_name = 'Assignment' AND id_class = 1), 0)
    , (1, (SELECT id FROM m_user WHERE username = 'student1'), (SELECT id FROM t_grade_composition WHERE grade_name = 'Midterm' AND id_class = 1), 0)
    , (1, (SELECT id FROM m_user WHERE username = 'student1'), (SELECT id FROM t_grade_composition WHERE grade_name = 'Final' AND id_class = 1), 0)
    , (1, (SELECT id FROM m_user WHERE username = 'student2'), (SELECT id FROM t_grade_composition WHERE grade_name = 'Assignment' AND id_class = 1), 0)
    , (1, (SELECT id FROM m_user WHERE username = 'student2'), (SELECT id FROM t_grade_composition WHERE grade_name = 'Midterm' AND id_class = 1), 0)
    , (1, (SELECT id FROM m_user WHERE username = 'student2'), (SELECT id FROM t_grade_composition WHERE grade_name = 'Final' AND id_class = 1), 0)
    , (1, (SELECT id FROM m_user WHERE username = 'student3'), (SELECT id FROM t_grade_composition WHERE grade_name = 'Assignment' AND id_class = 1), 0)
    , (1, (SELECT id FROM m_user WHERE username = 'student3'), (SELECT id FROM t_grade_composition WHERE grade_name = 'Midterm' AND id_class = 1), 0)
    , (1, (SELECT id FROM m_user WHERE username = 'student3'), (SELECT id FROM t_grade_composition WHERE grade_name = 'Final' AND id_class = 1), 0)
    , (1, (SELECT id FROM m_user WHERE username = 'student4'), (SELECT id FROM t_grade_composition WHERE grade_name = 'Assignment' AND id_class = 1), 0)
    , (1, (SELECT id FROM m_user WHERE username = 'student4'), (SELECT id FROM t_grade_composition WHERE grade_name = 'Midterm' AND id_class = 1), 0)
    , (1, (SELECT id FROM m_user WHERE username = 'student4'), (SELECT id FROM t_grade_composition WHERE grade_name = 'Final' AND id_class = 1), 0)
    , (2, (SELECT id FROM m_user WHERE username = 'student5'), (SELECT id FROM t_grade_composition WHERE grade_name = 'Assignment' AND id_class = 2), 0)
    , (2, (SELECT id FROM m_user WHERE username = 'student5'), (SELECT id FROM t_grade_composition WHERE grade_name = 'Midterm' AND id_class = 2), 0)
    , (2, (SELECT id FROM m_user WHERE username = 'student5'), (SELECT id FROM t_grade_composition WHERE grade_name = 'Final' AND id_class = 2), 0)
    , (2, (SELECT id FROM m_user WHERE username = 'student6'), (SELECT id FROM t_grade_composition WHERE grade_name = 'Assignment' AND id_class = 2), 0)
    , (2, (SELECT id FROM m_user WHERE username = 'student6'), (SELECT id FROM t_grade_composition WHERE grade_name = 'Midterm' AND id_class = 2), 0)
    , (2, (SELECT id FROM m_user WHERE username = 'student6'), (SELECT id FROM t_grade_composition WHERE grade_name = 'Final' AND id_class = 2), 0)
    , (2, (SELECT id FROM m_user WHERE username = 'student7'), (SELECT id FROM t_grade_composition WHERE grade_name = 'Assignment' AND id_class = 2), 0)
    , (2, (SELECT id FROM m_user WHERE username = 'student7'), (SELECT id FROM t_grade_composition WHERE grade_name = 'Midterm' AND id_class = 2), 0)
    , (2, (SELECT id FROM m_user WHERE username = 'student7'), (SELECT id FROM t_grade_composition WHERE grade_name = 'Final' AND id_class = 2), 0)
    , (3, (SELECT id FROM m_user WHERE username = 'student3'), (SELECT id FROM t_grade_composition WHERE grade_name = 'Assignment' AND id_class = 3), 0)
    , (3, (SELECT id FROM m_user WHERE username = 'student3'), (SELECT id FROM t_grade_composition WHERE grade_name = 'Midterm' AND id_class = 3), 0)
    , (3, (SELECT id FROM m_user WHERE username = 'student3'), (SELECT id FROM t_grade_composition WHERE grade_name = 'Final' AND id_class = 3), 0)
    , (3, (SELECT id FROM m_user WHERE username = 'student4'), (SELECT id FROM t_grade_composition WHERE grade_name = 'Assignment' AND id_class = 3), 0)
    , (3, (SELECT id FROM m_user WHERE username = 'student4'), (SELECT id FROM t_grade_composition WHERE grade_name = 'Midterm' AND id_class = 3), 0)
    , (3, (SELECT id FROM m_user WHERE username = 'student4'), (SELECT id FROM t_grade_composition WHERE grade_name = 'Final' AND id_class = 3), 0)
    , (3, (SELECT id FROM m_user WHERE username = 'student5'), (SELECT id FROM t_grade_composition WHERE grade_name = 'Assignment' AND id_class = 3), 0)
    , (3, (SELECT id FROM m_user WHERE username = 'student5'), (SELECT id FROM t_grade_composition WHERE grade_name = 'Midterm' AND id_class = 3), 0)
    , (3, (SELECT id FROM m_user WHERE username = 'student5'), (SELECT id FROM t_grade_composition WHERE grade_name = 'Final' AND id_class = 3), 0)
    , (3, (SELECT id FROM m_user WHERE username = 'student6'), (SELECT id FROM t_grade_composition WHERE grade_name = 'Assignment' AND id_class = 3), 0)
    , (3, (SELECT id FROM m_user WHERE username = 'student6'), (SELECT id FROM t_grade_composition WHERE grade_name = 'Midterm' AND id_class = 3), 0)
    , (3, (SELECT id FROM m_user WHERE username = 'student6'), (SELECT id FROM t_grade_composition WHERE grade_name = 'Final' AND id_class = 3), 0);

UPDATE t_class SET created_user = (SELECT id FROM m_user WHERE username = 'teacher1'), last_upd_user = (SELECT id FROM m_user WHERE username = 'teacher1') WHERE id = 1;
UPDATE t_class SET created_user = (SELECT id FROM m_user WHERE username = 'teacher2'), last_upd_user = (SELECT id FROM m_user WHERE username = 'teacher2') WHERE id = 2;
UPDATE t_class SET created_user = (SELECT id FROM m_user WHERE username = 'teacher3'), last_upd_user = (SELECT id FROM m_user WHERE username = 'teacher3') WHERE id = 3;