const inquirer = require('inquirer');
const ctable = require('console.table');
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Jiraiya2473653KrazyKids1310$1',
    database: 'myemployees_db'
});

function promptUser() {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: [
            {
                name:'View all Departments',
                value:'VIEW_departments',
            },
            {
                name:'View all Roles',
                value:'VIEW_roles',
            },
            {
                name:'View all Employees',
                value:'VIEW_employees',
            },
            {
                name:'Add a Department',
                value:'ADD_departments',
            },
            {
                name:'Add a Role',
                value:'ADD_role'
            },
            {
                name:'Add a Employee',
                value:'ADD_employee',
            },
            {
                name:'update Employee Role',
                value:'UPDATE_role',
            },
            {
                name: 'All Done',
                value: 'QUIT',
            }
            ]
        },
    ]).then(({choice}) => {
        switch(choice) {
            case 'VIEW_departments':
                viewAllDepartments();
                break;
            case 'VIEW_roles':
                viewAllRoles();
                break;
            case 'VIEW_employees':
                viewAllEmployees();
                break;
            case 'ADD_departments':
                addDepartment();
                break;
            case 'ADD_role':
                addRole();
                break;
            case 'ADD_employee':
                addEmployee();
                break;
            case 'UPDATE_role':
                updateEmployeeRole();
                break;
            default:
                connection.end();
        }
    })
}


function viewAllDepartments(){
    const sql = `SELECT * FROM department`;
    connection.query(sql, (err,rows) => {
        if (err)
            throw err;
        console.table(rows);
        promptUser();
    });
};
function viewAllRoles(){
    const sql = `SELECT role.role_id,  role.title,  role.salary, department.department_name AS department FROM department
        JOIN role ON department.department_id = role.department_id;`;
    connection.query(sql, (err,rows) => {
        if (err)
            throw err;
        console.table(rows);
        promptUser();
    });

};
function viewAllEmployees(){
    const sql = `Select e1.employee_id, e1.first_name, e1.last_name, department.department_name AS department, manager.first_name as manager, role.title as title from employee as E1
    Left join employee as manager on e1.manager_id = manager.employee_id
    JOIN department ON E1.department_id = department.department_id 
    join role on E1.title = role.role_id;
    `;
    connection.query(sql, (err,rows) => {
        if (err)
            throw err;
        console.table(rows);
        promptUser();
    });

};
function addDepartment(){
    inquirer.prompt([
    {type: 'input',
    name: 'department_name',
    message: 'Enter New Department Name',}
    ]).then(answers => {
        const sql = `INSERT INTO department (department_name) VALUES(?)`;
        console.log({answers});
        connection.query(sql, answers.department_name, (err,rows) => {
            if (err)
                throw err;
            console.log (`New Department ${answers} was added!`);
                promptUser();
        });
    });
};
function addNewRole(departmentID, departmentList){
    let dId = '';
    inquirer.prompt([{
        type: 'list',
        name: 'department_id',
        message: 'What department does this role belong to?',
        choices: departmentList
        },{
        type: 'input',
        name: 'title',
        message: 'Enter New Title'
        },{
        type: 'input',
        name: 'salary',
        message: "Enter New Role's Salary"   
        }
    ]).then(answers => {
        for(let i=0; i < departmentID.length; i++){
            if(answers.department_id === departmentList[i]){
                dId+= departmentID[i];
            }
        }
        const sql = `INSERT INTO role (department_id, title, salary) VALUES (?,?,?)`;
        connection.query(sql, [parseInt(dId), answers.title, parseInt(answers.salary)], (err,rows) => {
            if (err)
                throw err;
            console.log (`New Role ${answers} was added!`);
            promptUser();
        });
    });
};
function addNewEmployee(roleId, roleName){
    let rId = '';
    inquirer.prompt([{
        type: 'list',
        name: 'title',
        message: "Chose new Employee's title",
        choices: roleName
    },{
        type: 'input',
        name: 'first_name',
        message: "Enter New Employee's First Name"
    },{
        type: 'input',
        name: 'last_name',
        message: "Enter New Employee's Last Name"
    },{
        type: 'input',
        name: 'manager_id',
        message: "Enter New Employee's Manager's ID Number"
    }        

    ]).then(answers => {
        for(let i=0; i < roleId.length; i++){
            if(answers.title === roleName[i]){
                rId+= roleId[i];
            }
        }
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
        connection.query(sql, [answers.first_name, answers.last_name, parseInt(rId), answers.manager_id], (err,rows) => {
            if (err)
                throw err;
            console.log (`New Employee ${answers} was added!`);
            promptUser();
        });
    });
};

function updateEmployeeRole(){
// TODO: update answers.id to values by name questions with name.table id

};


function addEmployee(){
    let roleId = [];
    let roleName = [];
    let query = 'SELECT role_id, title FROM role'
    connection.query(query,(err, rows) => {
        if (err)
        throw err;
        rows.forEach(({role_id})=>{
            roleId.push(role_id)
        })
        rows.forEach(({title})=>{
            roleName.push(title)
        })
        addNewEmployee(roleId, roleName);
    })
}
function addRole(){
    let departmentList = [];
    let departmentId = [];
    let query = 'SELECT department_id, department_name FROM department'
    connection.query(query,(err, rows) => {
        if (err)
        throw err;
        rows.forEach(({department_id})=>{
            departmentId.push(department_id)
        })
        rows.forEach(({department_name})=>{
            departmentList.push(department_name)
        })
        addNewRole(departmentId, departmentList);
    })
}


promptUser();

