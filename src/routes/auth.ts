import { Request, Response, Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getPoolByTenantId } from "../db";
import dotenv from "dotenv";

dotenv.config();

const router = Router();

router.post("/signup", async (req: Request, res: Response) => {
  try {
    const { tenantId, email, password } = req.body as {
      tenantId: string;
      email: string;
      password: string;
    };
    console.log(tenantId);
    const pool = getPoolByTenantId(tenantId);

    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query("INSERT INTO users (email, password) VALUES ($1, $2)", [
      email,
      hashedPassword,
    ]);

    res.status(201).json({ message: "User created successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { tenantId, email, password } = req.body as {
      tenantId: string;
      email: string;
      password: string;
    };
    console.log(tenantId);
    console.log(email);
    const pool = getPoolByTenantId(tenantId);

    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (user.rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const storedPassword = user.rows[0].password;
    const isPasswordValid = await bcrypt.compare(password, storedPassword);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const secretKey = process.env.SECRET_KEY || "";

    const token = jwt.sign({ userId: user.rows[0].id }, secretKey, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export { router };
