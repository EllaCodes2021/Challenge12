

-- new join role--
SELECT
role.role_id,  role.title,  role.salary, department.department_name AS department 
FROM department
JOIN role ON department.department_id = role.department_id;

-- new join employees--
Select e1.employee_id, e1.first_name, e1.last_name, department.department_name AS department, manager.first_name as manager, role.title as title from employee as E1
Left join employee as manager on e1.manager_id = manager.employee_id
JOIN department ON E1.department_id = department.department_id 
join role on E1.title = role.role_id;



