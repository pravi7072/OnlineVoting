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
exports.AdminMiddleware = exports.AuthMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
const JWT_SCRT = process.env.JWT_SECRET || "fallbackSecret";
const AuthMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const header = req.headers.authorization;
        if (!header || !header.startsWith("Bearer ")) {
            res.status(401).json({ msg: "Invalid Token Format" });
            return;
        }
        const token = header.split(" ")[1];
        if (!token) {
            res.status(401).json({ msg: "Token is missing" });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SCRT);
        const user = yield prisma.user.findUnique({
            where: { id: decoded.id, username: decoded.username },
        });
        if (!user) {
            res.status(403).json({ msg: "Invalid Authorization" });
            return;
        }
        req.id = decoded.id;
        next();
    }
    catch (error) {
        res.status(403).json({ msg: "Invalid Token", error: error.message });
        return;
    }
});
exports.AuthMiddleware = AuthMiddleware;
const AdminMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer")) {
        res.json({ msg: "Invalid Token" });
        return;
    }
    const token = header.split(" ")[1];
    const decoded = jsonwebtoken_1.default.verify(token, JWT_SCRT);
    const response = yield prisma.user.findUnique({
        where: {
            username: decoded.username,
            id: decoded.id,
            role: "ADMIN"
        }
    });
    if (!response) {
        res.json({ msg: "Invalid Authorization" });
        return;
    }
    req.id = decoded.id;
    next();
});
exports.AdminMiddleware = AdminMiddleware;
