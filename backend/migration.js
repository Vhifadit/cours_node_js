import db from "./database.js"

const migrations = [
    {
        "cle":"001_migration",
        "sql":`CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nom VARCHAR(100) NOT NULL,
            email VARCHAR(150) NOT NULL UNIQUE,
            mot_de_passe VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
`
    },
     {
        "cle":"002_migration",
        "sql":`CREATE TABLE posts (
                id SERIAL PRIMARY KEY,
                titre VARCHAR(255) NOT NULL,
                contenu TEXT NOT NULL,
                auteur VARCHAR(100),
                date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                
            );
`

    }
]

function dbmigrate(){
    db.exec(`
    CREATE TABLE IF NOT EXISTS migrations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cle VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
        `)
         //all renvoie un ensemble d'objet 
         const dejaExecute = db.prepare("SELECT cle FROM migrations ").all().map(row =>row.cle) 
         const insererMigration = db.prepare("INSERT INTO migrations (cle) VALUES (?)")

            
        
      for( const migration of migrations) {
        /*1-executer notre requete sql
         2- inserer la cle dans la table 
         migrations */
         if(!dejaExecute.includes(migration.cle)){
             db.exec(migration.sql)
             insererMigration.run(migration.cle)
             console.log(migration.cle)

         } else{
            console.log("migration ",migration.cle," deja excecute")
         }
        
      } 
}
 
dbmigrate()