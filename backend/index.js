import express from 'express' 
import cors from 'cors'
import { deductSalaryCon, LoadUserCon,rateCon, PAYECon, UIFCon, HealthInsureCon, TakeHomeCon, LoadSalariesCon,LoadReviewsCon } from './controller/usersCon.js'


const app = express()

let PORT = process.env.PORT 

app.use(cors())
app.use(express.json())

//-------------------------------------------------------------------------------------------------

app.get('/users', LoadUserCon )
app.get('/salaries', LoadSalariesCon )
app.get('/reviews', LoadReviewsCon )
app.get('/users/deduct/:id', deductSalaryCon )     
app.get('/users/hrrate/:ID', rateCon )
app.get('/users/PAYE/:ID', PAYECon )     
app.get('/users/UIF/:ID', UIFCon )     
app.get('/users/HealthInsure/:ID', HealthInsureCon )     
app.get('/users/TakeHome/:ID', TakeHomeCon )     

app.listen(PORT,()=>{   
    console.log(`http://localhost:${PORT}`)
})