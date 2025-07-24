import {testUsers,CalculateDeducts,calculateRatePHR} from  '../model/usersDB.js'

const testUserCon = async(req,res)=>{
    res.json({
        users : await testUsers() 
    })

}

const deductSalaryCon =  async (req, res) => {
    const id = req.params.id;
    const deduction = await CalculateDeducts(id);
    res.json({ deduction });
    console.log({deduction})
};  

const rateCon = async (req,res) => {
    const ID = req.params.ID;
    const rateHr = await calculateRatePHR(ID)
    res.json({rateHr})
    console.log(`Controller:${rateHr}`)
    
};

export {testUserCon,deductSalaryCon,rateCon}