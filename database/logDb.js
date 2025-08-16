import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import path from 'node:path'

export async function viewAllUsers() {
  const db = await open({ 
    filename: path.join('database.db'),
    driver: sqlite3.Database
  });

  try { 
    const users = await db.all('SELECT * FROM users')
    // Neater table display
    const displayItems = users.map(({ id, name, job ,country }) => {
      return { id, name, job ,country }
    })
    console.table(displayItems)
  } catch (err) {
    console.error('Error fetching users:', err.message)
  } finally {
    await db.close()
  }
}

viewAllUsers()
