import argon2 from "argon2";
import db from "./database.js";
import { hashPassword } from "./lib/password.js";

export class Utilisateur { 
    

async create (data) { 
    console.log(`Nom: ${data.nom}, Email: ${data.email}`);
    const hash = await hashPassword(data.password);
    db.prepare("INSERT INTO users (nom, email, mot_de_passe) VALUES (?,?,?);")
    .run(data.nom,data.email,hash)
    return {...data, password: hash}

 }
   async login(email, password) {

     const user = db.prepare("SELECT * FROM users WHERE email = ?;").get(email);

     if (!user || !(await argon2.verify(user.mot_de_passe, password))) {

         throw new Error("Identifiants invalides"); 

        } 
    console.log(`Connexion réussie pour: ${user.nom}, Email: ${user.email}`); 
        return user; 
    }

} 
