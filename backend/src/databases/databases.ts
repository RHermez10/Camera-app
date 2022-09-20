const nedb = require('nedb-promise');

export const accounts: any = new nedb({
    filename: "accounts.db",
    autoload: true
});

export const photos: any = new nedb({
    filename: "photos.db",
    autoload: true
});