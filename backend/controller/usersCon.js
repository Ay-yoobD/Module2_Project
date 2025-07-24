import {testUsers,CalculateDeducts} from  '../model/usersDB.js'

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

export {testUserCon,deductSalaryCon}