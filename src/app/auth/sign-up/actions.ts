"use server";

import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";

const createUser = async (formData: FormData) => {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    throw new Error("All must be filled.");
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: email as string },
    });

    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name: name as string,
        email: email as string,
        password: hashedPassword,
        role: "USER", // Default role
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    return {
      message: "Successfully created user",
      success: true,
      user: newUser,
    };
  } catch (error) {
    console.error(error);
    return {
      message: error || "An error occurred",
      success: false,
    };
  }
};

export { createUser };
