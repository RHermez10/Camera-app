"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.photos = exports.accounts = void 0;
const nedb = require('nedb-promise');
;
exports.accounts = new nedb({
    filename: "accounts.db",
    autoload: true
});
exports.photos = new nedb({
    filename: "photos.db",
    autoload: true
});
