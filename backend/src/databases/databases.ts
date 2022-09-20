const nedb = require('nedb-promise');

interface database {
    filename: string,
    autoload: boolean
};

export const accounts: database = new nedb({
    filename: "accounts.db",
    autoload: true
});

export const photos: database = new nedb({
    filename: "photos.db",
    autoload: true
});