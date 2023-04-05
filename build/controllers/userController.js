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
exports.generateJwt = exports.loginUser = exports.registerUser = void 0;
const userModel_1 = __importDefault(require("models/userModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const salt = yield bcryptjs_1.default.genSalt();
    const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
    const user = yield userModel_1.default.create({
        name,
        email,
        password: hashedPassword,
    });
    return res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: (0, exports.generateJwt)(user._id),
    });
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield userModel_1.default.findOne({ email });
    if (yield bcryptjs_1.default.compare(password, user.password)) {
        return res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: (0, exports.generateJwt)(user._id),
        });
    }
    return res.status(400).json({ message: "Invalid Credentials" });
});
exports.loginUser = loginUser;
const generateJwt = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET || "", {
        expiresIn: "1d",
    });
};
exports.generateJwt = generateJwt;
