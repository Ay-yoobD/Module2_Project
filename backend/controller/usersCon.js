import {LoadUsers,CalculateDeducts,calculateRatePHR,CalculatePAYE,CalculateUIF,CalculateHealthInsure, CalculateTakeHome,LoadSalaries} from  '../model/usersDB.js'

const LoadUserCon = async(req,res)=>{
    res.json({
        users : await LoadUsers() 
    })

}

const LoadSalariesCon = async(req,res)=>{
    res.json({
       salaries: await LoadSalaries() 
    })

}

const deductSalaryCon =  async (req, res) => {
    const id = req.params.id;
    const deduction = await CalculateDeducts(id);
    res.json({ deduction });
    console.log({deduction})
}

const rateCon = async (req,res) => {
    const ID = req.params.ID;
    const rateHr = await calculateRatePHR(ID)
    res.json({rateHr})
    console.log(`Controller:${rateHr}`)
    
}

const PAYECon = async (req,res) => {
    const ID  = req.params.ID ;
    const PAYE = await CalculatePAYE(ID)
    res.json({PAYE})
    console.log(`Controller PAYE:${PAYE}`)
    
}

const UIFCon = async (req,res) => {
    const ID  = req.params.ID ;
    const UIF = await CalculateUIF(ID)
    res.json({UIF})
    console.log(`Controller UIF:${UIF}`)
    
}

const HealthInsureCon = async (req,res) => {
    const ID  = req.params.ID ;
    const HealthInsure = await CalculateHealthInsure(ID)
    res.json({HealthInsure})
    console.log(`Controller HealthInsure:${HealthInsure}`)
    
}

const TakeHomeCon = async (req,res) => {
    const ID  = req.params.ID ;
    const TakeHome  = await CalculateTakeHome(ID)
    res.json({TakeHome})
    console.log(`Controller TakeHome:${TakeHome}`)
    
}


export {LoadUserCon,deductSalaryCon,rateCon,PAYECon,UIFCon,HealthInsureCon,TakeHomeCon,LoadSalariesCon}