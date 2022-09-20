const nedb = require('nedb-promise');

export interface account {
    username: string,
    password: string,
    admin: boolean
};

export const accounts: any = new nedb({
    filename: "./databases/accounts.db",
    autoload: true
});

export interface photo {
    url: string,
    photographer?: string
};

export const photos: any = new nedb({
    filename: "./databases/photos.db",
    autoload: true
});