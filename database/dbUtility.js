import { user } from './db.js'
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import path from 'node:path'
import { members } from './login.js';

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
}

export async function createMemberTable() {
  const db = await open({
    filename: path.join('database.db'),
    driver: sqlite3.Database
  })
  await db.exec("DROP TABLE IF EXISTS members");
  await db.exec(`
            CREATE TABLE  members (
                  id INTEGER PRIMARY KEY AUTOINCREMENT, 
                  username TEXT NOT NULL UNIQUE, 
                  password TEXT NOT NULL,
                  role TEXT NOT NULL 
            )
      
      `)

  await db.close()

}

export async function seedMemberTable() {
  const db = await open({
    filename: path.join('database.db'),
    driver: sqlite3.Database
  })

  try {

    await db.exec('BEGIN TRANSACTION')

    for (const { username, password, role } of members) {

      await db.run(`
        INSERT INTO members (username, password, role)
        VALUES (?, ?, ?)`,
        [username, password, role]
      )

    }

    await db.exec('COMMIT')

  } catch (err) {

    await db.exec('ROLLBACK')
    console.error('Error inserting data:', err.message)

  } finally {

    await db.close()

  }
}

export async function viewAllMembers() {
const db = await open({
    filename: path.join('database.db'),
    driver: sqlite3.Database
  });

  try {
    const members = await db.all('SELECT * FROM members')
    console.table(members);
    return members

  } catch (err) {
    console.error('Error fetching members:', err.message)
  } finally {
    await db.close()
  }

}

export async function findMembersByCredientials(username, password) {
  const db = await open({
    filename: path.join('database.db'),
    driver: sqlite3.Database
  });

  try {
    const member = await db.get('SELECT * FROM members WHERE username = ? AND password = ?', [username, password]);

    if (!member) {
      return null;
    }

    return member;

  } catch (err) {
    console.error(`Error fetching member with username ${username}:`, err.message);
  } finally {
    await db.close();
  }
}
export async function insertMember(username, password, role) {

const db  = await open({
  filename : path.join('database.db'),
  driver: sqlite3.Database
})

try {
  await db.exec('BEGIN TRANSACTION');
    await db.run(`
      INSERT INTO members (username,password,role)
      VALUES (?, ?, ?)`,
      [username,password,role]
      )

      await db.exec('COMMIT');
      return true; // 🔑 important: return true to indicate success
}

catch(err) { 
await db.exec('ROLLBACK');
if (err.code === 'SQLITE_CONSTRAINT') { 
      console.error("❌ Username already exists:", username);
      return "DUPLICATE"; // 🔑 important: return a specific value for duplicate error
    } else {
      console.error("❌ DB Error:", err.message);
    return false
    }
   // throw err; // 🔑 important: rethrow so API can respond with error

}

finally {
    await db.close();
  
    viewAllMembers()
}

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

  } catch (err) {

    await db.exec('ROLLBACK')
    console.error('Error inserting data:', err.message)

  } finally {

    await db.close()

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
  }
}

export async function viewUser(id) {

  const db = await open({
    filename: path.join('database.db'),
    driver: sqlite3.Database
  });

  try {
    const singleUser = await db.all('SELECT * FROM users WHERE id = ?', [id])


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

export async function updateUserById(name, job, country, id) {
  const db = await open({
    filename: path.join('database.db'),
    driver: sqlite3.Database
  });

  try {
    const singleUser = await db.run('UPDATE users SET name = ? , job = ? , country = ? WHERE id = ?', [name, job, country, id])


    if (singleUser.changes === 0) {
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

export async function clearMemberTable() {
  const db = await open({
    filename: path.join('database.db'),
    driver: sqlite3.Database
  });

  try {
    const members = await db.all('DELETE FROM members')
  } catch (err) {
    console.error('Error ', err.message)
  } finally {
    await db.close()
  }
}

export async function clearUserTable() {
  const db = await open({
    filename: path.join('database.db'),
    driver: sqlite3.Database
  });

  try {
    const members = await db.all('DELETE FROM users')
  } catch (err) {
    console.error('Error ', err.message)
  } finally {
    await db.close()
  }
}