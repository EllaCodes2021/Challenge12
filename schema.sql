CREATE TABLE department (
    department_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    role_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL (10, 2) NOT NULL,
    department_id INTEGER REFERENCES department(department_id) ON DELETE SET NULL
);

CREATE TABLE employee (
    employee_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    department_id INTEGER REFERENCES department(department_id) ON DELETE SET NULL,
    manager_id INTEGER REFERENCES employee(employee_id),
    title VARCHAR(30) NOT NULL REFERENCES role(title) ON DELETE SET NULL
);



