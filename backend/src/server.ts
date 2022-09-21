import express from 'express';
import cors from 'cors';

const gallery = require('./routes/gallery');
const accounts = require('./routes/accounts');

const app = express();
const PORT = 1337;

app.use(cors({ origin: '*' }));
app.use(express.json());

// GALLERY
app.use('/gallery', gallery);

// ACCOUNTS
app.use('/accounts', accounts);

app.listen(PORT, () => {
    console.log('Server now running on port ', PORT);
});

