INSERT INTO department (department_name)
VALUES
    ('Milking'),
    ('Herd Management'),
    ('Bottling Team'),
    ('Curds Team'),
    ('Butter Team'),
    ('Yougurt Team'),
    ('Calf Keepers')
    ;
INSERT INTO role (department_id, title, salary)
VALUES
    (1, 'Milker', 12.00),
    (1, 'Milking Team Lead', 15.00),
    (2, 'Cow Keeper', 12.00),
    (2, 'Senior Cow Keeper', 15.00),
    (3, 'Bottler', 12.00),
    (3, 'Senior Bottler', 15.00),
    (4, 'Curd Cutter', 12.00),
    (4, 'Curd Master', 15.00),
    (5, 'Butter Churner', 12.00),
    (5, 'Butter Master', 15.00),
    (6, 'Yougurt Maker', 12.00),
    (7, 'Schwartz Master', 15.00),
    (7, 'Calf Keeper', 12.00),
    (7, 'Calf Wrangler', 15.00)
    ;


INSERT INTO employee ( first_name, last_name, role_id, manager_id)
VALUES
    ('Kate', 'Thomas', 2, NULL),
    ('Jack', 'Jones', 1, 1),
    ('Sherri', 'Philips', 4, NULL),
    ('Terry', 'James', 3, 3)
    ;