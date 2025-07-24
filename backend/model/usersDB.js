import { pool } from "../config/config.js"

const testUsers = async () => {
    let [row] = await pool.query('SELECT * FROM users')
    return row

}

const CalculateDeducts = async (EmpID) => {
    // let initialSalary = await pool.query('SELECT Salary FROM users WHERE EmployeeID = ?',[EmpID])
    // let finalSalary = await pool.query('SELECT FinalSalary FROM salaries WHERE EmployeeID = ? ',[EmpID])
    // let deductionAmount = initialSalary - finalSalary 
    // return deductionAmount
    const [salaryRow] = await pool.query('SELECT Salary FROM users WHERE EmployeeID = ?', [EmpID]);
    const [finalRow] = await pool.query('SELECT FinalSalary FROM salaries WHERE EmployeeID = ?', [EmpID]);


    const salary = salaryRow[0].Salary;
    const finalSalary = finalRow[0].FinalSalary;

    console.log(salary-finalSalary)

    return salary - finalSalary;

}

export {testUsers,CalculateDeducts}