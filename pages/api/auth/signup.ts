import { NextApiRequest, NextApiResponse } from "next";

import { hashPassword } from "@helpers/auth";
import prisma from "@helpers/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return;
  }

  const data = req.body;
  const { email, password, name } = data;
  const userEmail = email.toLowerCase();

  if (!userEmail || !userEmail.includes("@")) {
    res.status(422).json({ message: "Invalid email" });
    return;
  }

  if (!password || password.trim().length < 7) {
    res.status(422).json({ message: "Invalid input - password should be at least 7 characters long." });
    return;
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
  });

  if (existingUser) {
    return res.status(409).json({ message: "Email address is already registered" });
  }

  const hashedPassword = await hashPassword(password);

  await prisma.user.create({
    data: {
      name,
      email: userEmail,
      password: hashedPassword,
    },
  });

  res.status(201).json({ message: "Created user" });
}
