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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const databases_1 = require("./databases/databases");
const bcrypt_1 = require("./bcrypt");
const app = (0, express_1.default)();
const PORT = 1337;
app.use((0, cors_1.default)({ origin: '*' }));
app.use(express_1.default.json());
// GALLERY
app.post('/gallery', (req, res) => {
    const photoObj = req.body;
    databases_1.photos.insert(photoObj);
    res.status(200).send('OK!');
});
// GET Gallery
app.get('/gallery', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let resObj = {
        success: false,
    };
    if (req.headers.authorization !== undefined) {
        const user = req.headers.authorization.replace('Bearer ', '');
        const userPhotos = yield databases_1.photos.find({ photographer: user });
        if (userPhotos.length > 0) {
            resObj.success = true;
            resObj.data = userPhotos;
        }
        ;
    }
    ;
    res.json(resObj);
}));
//SIGNUP
app.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const credentials = req.body;
    let resObj = {
        success: true,
    };
    const usernameExist = yield databases_1.accounts.find({
        username: credentials.username
    });
    if (usernameExist.length > 0) {
        resObj.success = false;
    }
    else {
        // hash password 
        const hashedPassword = yield (0, bcrypt_1.hashPassword)(credentials.password);
        // update credentials object
        credentials.password = hashedPassword;
        // insert into database
        databases_1.accounts.insert(credentials);
    }
    ;
    res.json(resObj);
}));
// LOGIN
app.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const login = req.body;
    let resObj = {
        success: false,
    };
    console.log('LOGIN: ', login);
    const account = yield databases_1.accounts.find({
        username: login.username
    });
    if (account.length > 0) {
        console.log('User found!');
        const correctPassword = yield (0, bcrypt_1.comparePassword)(login.password, account[0].password);
        if (correctPassword) {
            console.log('Password correct!');
            resObj.success = true;
        }
    }
    res.json(resObj);
}));
app.listen(PORT, () => {
    console.log('Server now running on port ', PORT);
});
