import { query } from '../../index.js';

//creates a table that will consist of all favourited recipes 
async function createFavTable() {
  const res = await query(
    `CREATE TABLE IF NOT EXISTS favourites (recipe_id INT PRIMARY KEY, title TEXT, author TEXT, description TEXT, time TEXT, cost TEXT, nutrition TEXT, ingredients TEXT, image TEXT, serves INT, rating INT, rating_entries INT, shoppingList TEXT, userName TEXT, image_url TEXT);`
  );
  console.log(res.command, 'favourites table created');
}

createFavTable();
