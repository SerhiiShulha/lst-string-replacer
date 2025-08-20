import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'database.db');
export const db = new Database(dbPath);

console.log(dbPath)

db.exec(`
  CREATE TABLE IF NOT EXISTS instructions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  original_text TEXT,
  replacement_text TEXT
)
`);