"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const gallery = require('./routes/gallery');
const accounts = require('./routes/accounts');
const app = (0, express_1.default)();
const PORT = 1337;
app.use((0, cors_1.default)({ origin: '*' }));
app.use(express_1.default.json());
// GALLERY
app.use('/gallery', gallery);
// ACCOUNTS
app.use('/accounts', accounts);
app.listen(PORT, () => {
    console.log('Server now running on port ', PORT);
});
