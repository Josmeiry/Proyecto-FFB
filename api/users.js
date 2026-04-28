import { sql } from "@neondatabase/serverless";

export default async function handler(req, res) {
  try {
    const usuarios = await sql`SELECT * FROM usuarios`;
    res.status(200).json(usuarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}