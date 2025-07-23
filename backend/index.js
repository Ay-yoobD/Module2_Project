import express from 'express' 
import mysql2 from 'mysql2/promise'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()
const app = express()
let PORT = process.env.PORT 
const pool = mysql2.createPool({
    host : process.env.HOST,
    user : process.env.USER,
    password : process.env.PASSWORD,
    database : process.env.DATABASE

})
app.use(cors())



const testUsers = async () => {
    let [row] = await pool.query('SELECT * FROM users')
    return row

    
}

app.get('/users', async(req,res)=>{
    res.json({
        users : await testUsers()
    })
})





app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`)
})