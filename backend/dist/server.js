"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = 1337;
app.use((0, cors_1.default)({ origin: '*' }));
app.use(express_1.default.json());
app.post('/gallery', (req, res) => {
    console.log(`REQ.body: `, req.body.data);
    res.status(200).send('OK!');
});
app.listen(PORT, () => {
    console.log('Server now running on port ', PORT);
});
