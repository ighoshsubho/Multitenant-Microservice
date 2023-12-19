"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../db");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const router = (0, express_1.Router)();
exports.router = router;
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tenantId, email, password } = req.body;
        console.log(tenantId);
        const pool = (0, db_1.getPoolByTenantId)(tenantId);
        const existingUser = yield pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        yield pool.query("INSERT INTO users (email, password) VALUES ($1, $2)", [
            email,
            hashedPassword,
        ]);
        res.status(201).json({ message: "User created successfully" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tenantId, email, password } = req.body;
        console.log(tenantId);
        console.log(email);
        const pool = (0, db_1.getPoolByTenantId)(tenantId);
        const user = yield pool.query("SELECT * FROM users WHERE email = $1", [
            email,
        ]);
        if (user.rows.length === 0) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const storedPassword = user.rows[0].password;
        const isPasswordValid = yield bcryptjs_1.default.compare(password, storedPassword);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const secretKey = process.env.SECRET_KEY || "";
        const token = jsonwebtoken_1.default.sign({ userId: user.rows[0].id }, secretKey, {
            expiresIn: "1h",
        });
        res.status(200).json({ token });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
