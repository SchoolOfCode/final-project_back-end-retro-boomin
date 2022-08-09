import { query } from '../db/index.js';

export async function getShop() {
  const data = await query(`SELECT * FROM shopping;`);
  return data.rows;
}

export async function postShopItem(newItem) {
  const { username, item } = newItem;

  const data = await query(
    `INSERT INTO shopping (username, item) VALUES ($1, $2) RETURNING *;`,
    [username, item]
  );
  return data.rows;
};

export async function deleteShop(id) {
    const data = await query(
      `DELETE FROM shopping WHERE recipe_id = $1 RETURNING *`,
      [Number(id)]
    );
    return data.rows;
  };
  