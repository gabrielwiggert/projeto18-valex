import { connection } from "../config/database";

export async function createCard() {
  const result = await connection.query(
    `
      SELECT * 
      FROM fighters 
      ORDER BY wins DESC, draws DESC;
    `
  );
  return result.rows;
}