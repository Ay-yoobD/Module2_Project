import { pool } from "../config/config.js"

const LoadUsers = async () => {

    try {
        let [row] = await pool.query('SELECT * FROM users')
        return row
    } catch (error) {
        console.error('Error loading users:', error)
        throw error
    }

}



const LoadSalaries = async () => {

    try {
        let [row] = await pool.query('SELECT * FROM salaries')
        return row
    } catch (error) {
        console.error('Error loading salaries:', error)
        throw error
    }

}



const LoadReviews = async () => {

    try {
        let [row] = await pool.query('SELECT * FROM reviews')
        return row
    } catch (error) {
        console.error('Error loading reviews:', error)
        throw error
    }

}



const CalculateDeducts = async (EmpID) => {

    // let initialSalary = await pool.query('SELECT Salary FROM users WHERE EmployeeID = ?',[EmpID])
    // let finalSalary = await pool.query('SELECT FinalSalary FROM salaries WHERE EmployeeID = ? ',[EmpID])
    // let deductionAmount = initialSalary - finalSalary 
    // return deductionAmount

    try {
        const [salaryRow] = await pool.query('SELECT Salary FROM users WHERE EmployeeID = ?', [EmpID]);
        const [finalRow] = await pool.query('SELECT FinalSalary FROM salaries WHERE EmployeeID = ?', [EmpID]);

        const salary = salaryRow[0].Salary;
        const finalSalary = finalRow[0].FinalSalary;

        console.log(salary - finalSalary)

        return salary - finalSalary;

    } catch (error) {
        console.error('Error calculating deduction:', error)
        throw error
    }

}



const calculateRatePHR = async (EmpID) => {

    try {
        const [rowSalary] = await pool.query('SELECT Salary FROM users WHERE EmployeeID = ?;', [EmpID]);
        const [hrsWork] = await pool.query('SELECT HoursWorked FROM salaries WHERE EmployeeID = ?;', [EmpID])

        const salary = rowSalary[0].Salary;
        const HRsWork = hrsWork[0].HoursWorked;

        console.log(`UserDB rate:${salary / HRsWork}`)

        return salary / HRsWork

    } catch (error) {
        console.error('Error calculating rate per hour:', error)
        throw error
    }

}



const CalculatePAYE = async (EmpID) => {

    try {
        let PAYEPercent = 36 / 100;
        console.log(PAYEPercent)

        const [rowFSalary] = await pool.query('SELECT FinalSalary FROM salaries WHERE EmployeeID = ?;', [EmpID])

        const fSalary = rowFSalary[0].FinalSalary;
        console.log(fSalary);

        const PAYE = fSalary * PAYEPercent;

        console.log(`UserDB PAYE:${PAYE}`)

        return PAYE

    } catch (error) {
        console.error('Error calculating PAYE:', error)
        throw error
    }

}



const CalculateUIF = async (EmpID) => {

    try {
        let UIFPercent = 2 / 100;
        console.log(UIFPercent)

        const [rowFSalary] = await pool.query('SELECT FinalSalary FROM salaries WHERE EmployeeID = ?;', [EmpID])

        const fSalary = rowFSalary[0].FinalSalary;
        console.log(fSalary);

        const UIF = fSalary * UIFPercent;

        console.log(`UserDB UIF:${UIF}`)

        return UIF

    } catch (error) {
        console.error('Error calculating UIF:', error)
        throw error
    }

}



const CalculateHealthInsure = async (EmpID) => {

    try {
        let HealthInsurePercent = 2 / 100;
        console.log(HealthInsurePercent)

        const [rowFSalary] = await pool.query('SELECT FinalSalary FROM salaries WHERE EmployeeID = ?;', [EmpID])

        const fSalary = rowFSalary[0].FinalSalary;
        console.log(fSalary);

        const HealthInsure = fSalary * HealthInsurePercent;

        console.log(`UserDB TakeHome:${HealthInsure}`)

        return HealthInsure

    } catch (error) {
        console.error('Error calculating Health Insurance:', error)
        throw error
    }

}



const CalculateTakeHome = async (EmpID) => {

    try {
        const [rowFSalary] = await pool.query('SELECT FinalSalary FROM salaries WHERE EmployeeID = ?;', [EmpID])

        const fSalary = rowFSalary[0].FinalSalary;
        console.log(fSalary);

        const HealthInsure = await CalculateHealthInsure(EmpID);
        const PAYE = await CalculatePAYE(EmpID);
        const UIF = await CalculateUIF(EmpID);

        let TakeHome = fSalary - HealthInsure - PAYE - UIF
        console.log(`UserDB TakeHome:${TakeHome}`)

        return TakeHome

    } catch (error) {
        console.error('Error calculating Take Home:', error)
        throw error
    }

}


export {LoadUsers,CalculateDeducts,calculateRatePHR,CalculatePAYE,CalculateUIF, CalculateHealthInsure,CalculateTakeHome,LoadSalaries, LoadReviews}