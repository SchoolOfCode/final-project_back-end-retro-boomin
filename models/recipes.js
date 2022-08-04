import { DataRowMessage } from 'pg-protocol/dist/messages.js';
import { query } from '../db/index.js';

export async function getRecipes() {
  const data = await query(`SELECT * FROM recipes;`);
  return data.rows;
}
export async function getbyID(id) {
  const data = await query(`SELECT * FROM recipes where recipe_id = $1;`, [id]);
  return data.rows;
}

export async function postRecipe(newRecipe) {
  const {
    title,
    author,
    description,
    time,
    cost,
    nutrition,
    ingredients,
    image,
    serves,
    rating,
    rating_entries,
  } = newRecipe;

  const data = await query(
    `INSERT INTO recipes (title, author, description, time, cost, nutrition, ingredients, image, serves, rating, rating_entries) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *;`,
    [
      title,
      author,
      description,
      time,
      cost,
      nutrition,
      ingredients,
      image,
      serves,
      0,
      0,
    ]
  );
  return data.rows;
}

export async function getBySearch(input) {
  const data = await query(`SELECT * FROM recipes
  WHERE title LIKE '${input}%' or author LIKE '${input}%' or description LIKE '${input}%' or nutrition LIKE '${input}%' or ingredients LIKE '${input}%';`);
  return data.rows;
}

export async function createNewRecipe(newRecipe) {
  const {
    title,
    author,
    description,
    time,
    cost,
    nutrition,
    ingredients,
    image,
    serves,
    rating,
    rating_entries,
  } = newRecipe;
  const data = await query(
    `INSERT INTO recipes (title, author, description, time, cost, nutrition, ingredients, image, serves, rating, rating_entries) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *;`,
    [
      title,
      author,
      description,
      time,
      cost,
      nutrition,
      ingredients,
      image,
      serves,
      0,
      0,
    ]
  );
  return data.rows;
}

export async function updateRating(id, updated) {
  const { rating } = updated;
  const data = await query(
    `UPDATE recipes SET rating = $1 , rating_entries = rating_entries + 1 WHERE recipe_id = $2 RETURNING *;`,
    [rating, id]
  );
  return data.rows;
}

export async function calculateAvg() {
  const data = await query(`SELECT AVG(ALL rating) FROM recipes`);
  return data.rows;
}


// export async function updateTicket(id, updatedTicket) {
//   const { name, roomnumber, message, keywords, status } = updatedTicket;
//   const data = await query(
//     `UPDATE tickets SET name = $1, roomnumber = $2, message = $3, keywords = $4, status = $5 WHERE  ticket_id = $6 RETURNING *;`,
//     [name, roomnumber, message, keywords, status, Number(id)]
//   );
//   return data.rows;
// }

// export async function deleteTicket(id) {
//   console.log("delete");
//   const data = await query(
//     `DELETE FROM tickets WHERE ticket_id = $1 RETURNING *`,
//     [Number(id)]
//   );
//   return data.rows;
// }
