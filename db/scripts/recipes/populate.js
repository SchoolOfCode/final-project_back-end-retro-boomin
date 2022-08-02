import { query } from "../../index.js";
import { data } from "../../../libs/recipeData.js";

async function populateRecipesTable() {
  for (let i = 0; i < data.length; i++) {
    const res = await query(
      `INSERT INTO recipes (title, author, description, time, cost, nutrition, ingredients, image, serves, rating, rating_entries) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *;`,
      [data[i].title,
      data[i].author, 
      data[i].description, 
      data[i].time, 
      data[i].cost, 
      data[i].nutrition, 
      data[i].ingredients, 
      data[i].image, 
      data[i].serves, 
      data[i].rating, 
      data[i].rating_entries]
    );
    console.log(`Added to DB: ${res.rows[0].title}`);
  }
}

populateRecipesTable();
