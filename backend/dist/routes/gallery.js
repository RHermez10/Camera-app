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
const databases_1 = require("../databases/databases");
const router = express_1.default.Router();
// GET
router.get('', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let resObj = {
        success: false,
    };
    if (req.headers.authorization !== undefined) {
        const user = req.headers.authorization.replace('Bearer ', '');
        const account = yield databases_1.accounts.find({ username: user });
        let photoArray;
        if (account[0].admin == true) {
            photoArray = yield databases_1.photos.find({});
        }
        else {
            photoArray = yield databases_1.photos.find({ photographer: user });
        }
        if (photoArray.length > 0) {
            resObj.success = true;
            resObj.data = photoArray;
        }
        ;
    }
    ;
    res.json(resObj);
}));
// POST
router.post('', (req, res) => {
    const photoObj = req.body;
    databases_1.photos.insert(photoObj);
    res.status(200).send('OK!');
});
// DELETE
router.delete('', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let result = { success: false };
    const photoId = req.body.id;
    const removed = yield databases_1.photos.remove({ _id: photoId }, {});
    if (removed > 0) {
        result.success = true;
    }
    res.json(result);
}));
module.exports = router;
