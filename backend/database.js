import Database from 'better-sqlite3';
const db = new Database('foobar.db', );
db.pragma('journal_mode = WAL');

export function dbInitialisation(){
    db.exec(`
    CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    mot_de_passe VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

        `)
}
export default db