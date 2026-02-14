import "dotenv/config";
import express from 'express'
import argon2 from 'argon2'
import { Utilisateur } from './user.service.js'
import { validateData } from "./lib/validate.js";
import { loginSchema } from "./schemas/user.schema.js";
import { signToken } from "./lib/jwt.js";

const app = express()
app.use(express.json())


app.post('/auth/register', async (req,res,next) =>{
   console.log(req.body)

  const user = new Utilisateur()
  res.json(await user.create(req.body));

})
app.post('/auth/login',async (req,res,next)=>{
 const data =  validateData(loginSchema, req.body)// validation 

 const user = new Utilisateur()
 const utilisateurloge = await user.login(data.email,data.password)
 const token = await signToken({ userId: utilisateurloge.id })
 res.json({
      success: true,
      user: utilisateurloge,
      token,
    });
})



app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})