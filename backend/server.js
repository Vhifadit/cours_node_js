import express from 'express'
import argon2 from 'argon2'
import { Utilisateur } from './user.service.js'

const app = express()
app.use(express.json())


app.post('/auth/register', async (req,res,next) =>{
   console.log(req.body)

  const user = new Utilisateur()
  res.json(await user.create(req.body));

})
app.post('auth/login',(req,res,next)=>{

})





app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})