// lib/db.js
import mysql from 'mysql2/promise';

export async function connectToDatabase() {
  const connection = await mysql.createConnection({
    host: 'localhost',     // your host
    user: 'your_user',     // your mysql user
    password: 'your_pass', // your mysql password
    database: 'your_db'    // your database name
  });

  return connection;
}
