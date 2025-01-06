"use server";

import { pool } from "@/lib/postgres";
import { hash } from "bcrypt";

const createUser = async (formData: FormData) => {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    throw new Error("All must be filled.");
  }

  try {
    const existingUser = await pool.query(
      `SELECT id FROM users WHERE email = $1`,
      [email]
    );

    if (existingUser.rows.length > 0) {
      throw new Error("User already exists");
    }

    const hashedPassword = await hash(password, 10);

    const insertUserQuery = `
        INSERT INTO users (name, email, password)
        VALUES ($1, $2, $3)
        RETURNING id, name, email, role
      `;

    await pool.query(insertUserQuery, [name, email, hashedPassword]);

    return {
      message: "Successfully created user",
      success: true,
    };
  } catch (error) {
    console.warn(error);
    return {
      message: error,
      success: false,
    };
  }
};

export { createUser };
