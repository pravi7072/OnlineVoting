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
exports.ElectonRouter = void 0;
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const cors_1 = __importDefault(require("cors"));
const Authorization_1 = require("../middlewares/Authorization");
const prisma = new client_1.PrismaClient();
exports.ElectonRouter = express_1.default.Router();
exports.ElectonRouter.use(express_1.default.json());
exports.ElectonRouter.use((0, cors_1.default)());
exports.ElectonRouter.post("/", Authorization_1.AdminMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const { title, options } = body;
    const createdBy = req.id;
    if (!title || !options || !createdBy || !createdBy) {
        res.json({ msg: "Election fields are not correct" });
        return;
    }
    const election = yield prisma.election.create({
        data: {
            title,
            options,
            createdBy
        }
    });
    if (!election) {
        res.json({ msg: "Cannot create election" });
        return;
    }
    res.json({ msg: "Election Created Successfully", election });
}));
exports.ElectonRouter.get("/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const elections = yield prisma.election.findMany();
        if (elections.length === 0) {
            res.status(404).json({ msg: "No election found" });
            return;
        }
        res.json({ elections });
    }
    catch (error) {
        res.status(500).json({ msg: "Internal Server Error", error: error.message });
    }
}));
exports.ElectonRouter.post("/vote", Authorization_1.AuthMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const { electionId, option } = body;
    const userId = req.id;
    if (!electionId || !option || !userId) {
        res.json({ msg: "Something wrong with the inputs" });
        return;
    }
    const check = yield prisma.vote.findFirst({ where: {
            userId, electionId
        } });
    if (check) {
        res.json({ msg: "You have already voted" });
        return;
    }
    const vote = yield prisma.vote.create({
        data: {
            electionId,
            userId,
            option
        }
    });
    if (!vote) {
        res.json("Could not cast your vote");
        return;
    }
    res.json({ msg: "Your vote added casted successfully", vote });
}));
exports.ElectonRouter.get('/:electionId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const electionId = Number(req.params.electionId);
    const results = yield prisma.election.findFirst({
        where: {
            id: electionId
        }
    });
    res.json(results);
}));
exports.ElectonRouter.get('/results/:electionId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { electionId } = req.params;
    const results = yield prisma.vote.groupBy({
        by: ['option'],
        _count: { option: true },
        where: { electionId: parseInt(electionId) }
    });
    res.json(results);
}));
