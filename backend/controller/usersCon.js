import {LoadUsers,CalculateDeducts,calculateRatePHR,CalculatePAYE,CalculateUIF,CalculateHealthInsure, CalculateTakeHome,LoadSalaries, LoadReviews} from  '../model/usersDB.js'


const LoadUserCon = async (req, res) => {

    try {
        const users = await LoadUsers()
        res.json({ users })
    } catch (error) {
        console.error('Error loading users:', error)
        res.status(500).json({ error: 'Failed to load users' })
    }

}



const LoadSalariesCon = async (req, res) => {

    try {
        const salaries = await LoadSalaries()
        res.json({ salaries })
    } catch (error) {
        console.error('Error loading salaries:', error)
        res.status(500).json({ error: 'Failed to load salaries' })
    }

}



const LoadReviewsCon = async (req, res) => {

    try {
        const reviews = await LoadReviews()
        res.json({ reviews })
    } catch (error) {
        console.error('Error loading reviews:', error)
        res.status(500).json({ error: 'Failed to load reviews' })
    }

}



const deductSalaryCon = async (req, res) => {

    const id = req.params.id

    try {
        const deduction = await CalculateDeducts(id)
        res.json({ deduction })
        console.log({ deduction })
    } catch (error) {
        console.error('Error calculating deduction:', error)
        res.status(500).json({ error: 'Failed to calculate deduction' })
    }

}



const rateCon = async (req, res) => {

    const ID = req.params.ID

    try {
        const rateHr = await calculateRatePHR(ID)
        res.json({ rateHr })
        console.log(`Controller: ${rateHr}`)
    } catch (error) {
        console.error('Error calculating rate/hr:', error)
        res.status(500).json({ error: 'Failed to calculate rate/hr' })
    }

}



const PAYECon = async (req, res) => {

    const ID = req.params.ID

    try {
        const PAYE = await CalculatePAYE(ID)
        res.json({ PAYE })
        console.log(`Controller PAYE: ${PAYE}`)
    } catch (error) {
        console.error('Error calculating PAYE:', error)
        res.status(500).json({ error: 'Failed to calculate PAYE' })
    }

}



const UIFCon = async (req, res) => {

    const ID = req.params.ID

    try {
        const UIF = await CalculateUIF(ID)
        res.json({ UIF })
        console.log(`Controller UIF: ${UIF}`)
    } catch (error) {
        console.error('Error calculating UIF:', error)
        res.status(500).json({ error: 'Failed to calculate UIF' })
    }

}



const HealthInsureCon = async (req, res) => {

    const ID = req.params.ID

    try {
        const HealthInsure = await CalculateHealthInsure(ID)
        res.json({ HealthInsure })
        console.log(`Controller HealthInsure: ${HealthInsure}`)
    } catch (error) {
        console.error('Error calculating Health Insurance:', error)
        res.status(500).json({ error: 'Failed to calculate Health Insurance' })
    }

}



const TakeHomeCon = async (req, res) => {

    const ID = req.params.ID

    try {
        const TakeHome = await CalculateTakeHome(ID)
        res.json({ TakeHome })
        console.log(`Controller TakeHome: ${TakeHome}`)
    } catch (error) {
        console.error('Error calculating Take Home:', error)
        res.status(500).json({ error: 'Failed to calculate Take Home' })
    }

}


export {LoadUserCon,deductSalaryCon,rateCon,PAYECon,UIFCon,HealthInsureCon,TakeHomeCon,LoadSalariesCon,LoadReviewsCon}