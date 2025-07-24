import express from 'express' 
import cors from 'cors'
import { deductSalaryCon, testUserCon } from './controller/usersCon.js'


const app = express()

let PORT = process.env.PORT 

app.use(cors())
app.use(express.json())

//-------------------------------------------------------------------------------------------------

app.get('/users', testUserCon )
app.get('/users/deduct/:id', deductSalaryCon )     

app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`)
     
})