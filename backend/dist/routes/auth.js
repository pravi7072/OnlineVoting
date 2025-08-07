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
exports.UserRouter = void 0;
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zod_1 = __importDefault(require("zod"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const prisma = new client_1.PrismaClient();
exports.UserRouter = express_1.default.Router();
exports.UserRouter.use(express_1.default.json());
exports.UserRouter.use((0, cors_1.default)());
dotenv_1.default.config();
const JWT_SCRT = process.env.JWT_SECRET || "fallbackSecret";
const SignupSchema = zod_1.default.object({
    username: zod_1.default.string().email(),
    password: zod_1.default.string().min(8),
    role: zod_1.default.enum(["USER", "ADMIN"]).optional()
});
exports.UserRouter.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const { success } = SignupSchema.safeParse(body);
    if (!success) {
        res.json({
            msg: "Invalid Body"
        });
        return;
    }
    const { username, password, role } = body;
    if (!username || !password || !role) {
        res.json({ msg: "Something is missing check your body data" });
        return;
    }
    const user = yield prisma.user.create({
        data: {
            username,
            password,
            role
        }
    });
    if (!user) {
        res.json({ msg: "Unable to create User" });
        return;
    }
    const token = jsonwebtoken_1.default.sign({
        id: user.id,
        username
    }, JWT_SCRT);
    res.json({ msg: "User Created Successfully", token: token });
}));
exports.UserRouter.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const { username, password } = body;
    if (!username || !password) {
        res.json({ msg: "Invalidate credentials" });
        return;
    }
    const user = yield prisma.user.findFirst({
        where: {
            username,
            password
        }
    });
    if (!user) {
        res.json({ msg: "User not found in daatabase" });
        return;
    }
    const token = jsonwebtoken_1.default.sign({ id: user.id, username }, JWT_SCRT);
    res.json({
        token: token
    });
}));
