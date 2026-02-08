import argon2 from "argon2";
import db from "./database.js";

export class Utilisateur { 
    

async create (data) { 
    const hash = await argon2.hash(data.password);
    console.log(`Nom: ${this.nom}, Email: ${this.email}`);
    db.prepare("INSERT INTO users (nom, email, mot_de_passe) VALUES (?,?,?);")
    .run(data.name,data.email,hash)
    return {...data, password: hash}

 }

} 
