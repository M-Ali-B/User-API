import { user } from './db.js'
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import path from 'node:path'

export let DATA;

export async function createTable() {

  const db = await open({
    filename: path.join('database.db'),
    driver: sqlite3.Database
  })

  await db.exec(`
            CREATE TABLE IF NOT EXISTS users (
                  id INTEGER PRIMARY KEY AUTOINCREMENT, 
                  name TEXT NOT NULL, 
                  job TEXT NOT NULL,
                  country TEXT NOT NULL 
            )
      
      `)

  await db.close()
  console.log('table created')
}


export async function viewAllUsers() {
  const db = await open({
    filename: path.join('database.db'),
    driver: sqlite3.Database
  });

  try {
    const users = await db.all('SELECT * FROM users')
    console.table(users);
    return users
    
    /* Neater table display just for removing extra colums 
 
// const displayItems = users.map(({ id, name, job ,country }) => {
//   return { id, name, job ,country }
// })
return displayItems
*/
  } catch (err) {
    console.error('Error fetching users:', err.message)
  } finally {
    await db.close()
  }
}

export async function seedTable() {

  const db = await open({
    filename: path.join('database.db'),
    driver: sqlite3.Database
  })

  try {

    await db.exec('BEGIN TRANSACTION')

    for (const { name, job, country } of user) {

      await db.run(`
        INSERT INTO users (name, job, country)
        VALUES (?, ?, ?)`,
        [name, job, country]
      )

    }

    await db.exec('COMMIT')
    console.log('All records inserted successfully.')

  } catch (err) {

    await db.exec('ROLLBACK')
    console.error('Error inserting data:', err.message)

  } finally {

    await db.close()
    console.log('Database connection closed.')

  }
}


export async function deleteUserDb(id) {
  const db = await open({
    filename: path.join('database.db'),
    driver: sqlite3.Database
  })

try {
    const result = await db.run(
      `DELETE FROM users WHERE id = ?`,
      [id]  // ✅ parameterized query
    );

    if (result.changes === 0) {
      console.log(`No user found with id ${id}`);
    } else {
      console.log(`User with id ${id} deleted successfully`);
    }

  } catch (err) {
    console.error(`Error deleting user with id ${id}:`, err.message);
  } finally {
    await db.close();
    console.log('Database connection closed');
  }
}


export async function viewUser(id) {

  const db = await open({
    filename: path.join('database.db'),
    driver: sqlite3.Database
  });

  try {
    const singleUser = await db.all('SELECT * FROM users WHERE id = ?',[id])
   
    
if (singleUser.changes === 0) {
      console.log(`No user found with id ${id}`);
      return null;
    } else {
       console.table(singleUser);
      return singleUser
    }

  } catch (err) {
    console.error(`Error fetching user of ${id}`, err.message)
  } finally {
    await db.close()
  }
  
}


export async function updateUserById(name, job, country,id) {
  const db = await open({
    filename: path.join('database.db'),
    driver: sqlite3.Database
  });

  try {
    const singleUser = await db.run('UPDATE users SET name = ? , job = ? , country = ? WHERE id = ?',[name,job,country,id])
   
    
if (singleUser.changes === 0) {
      console.log(`No user found with id ${id}`);
      return null;
    } else {
      return true
    }

  } catch (err) {
    console.error(`Error fetching user of ${id}`, err.message)
  } finally {
    await db.close()
  }
}