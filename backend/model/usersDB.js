import { pool } from "../config/config.js"

const LoadUsers = async () => {
    let [row] = await pool.query('SELECT * FROM users')
    return row

}

const LoadSalaries = async () => {
    let [row] = await pool.query('SELECT * FROM salaries')
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

const calculateRatePHR = async (EmpID) => {
    const [rowSalary] = await pool.query('SELECT Salary FROM users WHERE EmployeeID = ?;',[EmpID]);
    const [hrsWork] = await pool.query('SELECT HoursWorked FROM salaries WHERE EmployeeID = ?;',[EmpID])

    const salary = rowSalary[0].Salary;
    const HRsWork = hrsWork[0].HoursWorked;
    
    console.log(`UserDB rate:${salary/HRsWork}`)

    return salary/HRsWork
    
}

const CalculatePAYE = async (EmpID) => {
    let PAYEPercent = 36 /100 ;
    console.log(PAYEPercent)
    const [rowFSalary] = await pool.query('SELECT FinalSalary FROM salaries WHERE EmployeeID = ?;',[EmpID])

    const fSalary = rowFSalary[0].FinalSalary;
    console.log(fSalary);
    
    const PAYE = fSalary * PAYEPercent ;

    console.log(`UserDB PAYE:${PAYE}`)
    
    return PAYE
    
}

const CalculateUIF = async (EmpID) => {
    let UIFPercent = 2 /100 ;
    console.log(UIFPercent)
    const [rowFSalary] = await pool.query('SELECT FinalSalary FROM salaries WHERE EmployeeID = ?;',[EmpID])

    const fSalary = rowFSalary[0].FinalSalary;
    console.log(fSalary);
    
    const UIF = fSalary * UIFPercent ;

    console.log(`UserDB UIF:${UIF}`)
    
    return UIF
    
}

const CalculateHealthInsure = async (EmpID) => {
    let HealthInsurePercent = 2 /100 ;
    console.log(HealthInsurePercent)
    const [rowFSalary] = await pool.query('SELECT FinalSalary FROM salaries WHERE EmployeeID = ?;',[EmpID])

    const fSalary = rowFSalary[0].FinalSalary;
    console.log(fSalary);
    
    const HealthInsure = fSalary * HealthInsurePercent ;

    console.log(`UserDB TakeHome:${HealthInsure}`)
    
    return HealthInsure
    
}

const CalculateTakeHome = async (EmpID) => {
    const [rowFSalary] = await pool.query('SELECT FinalSalary FROM salaries WHERE EmployeeID = ?;',[EmpID])
    

    const fSalary = rowFSalary[0].FinalSalary;
    console.log(fSalary);

    const HealthInsure = await CalculateHealthInsure(EmpID);
    const PAYE = await CalculatePAYE(EmpID);
    const UIF = await CalculateUIF(EmpID);
    
    let TakeHome = fSalary - HealthInsure - PAYE - UIF
    console.log(`UserDB TakeHome:${TakeHome}`)

    return TakeHome
    
}

export {LoadUsers,CalculateDeducts,calculateRatePHR,CalculatePAYE,CalculateUIF, CalculateHealthInsure,CalculateTakeHome,LoadSalaries}