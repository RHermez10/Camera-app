import express from 'express';
import cors from 'cors';
import { account, accounts, login, photo, photos, resObj } from './databases/databases'
import { hashPassword, comparePassword } from './bcrypt';

const app = express();
const PORT = 1337;

app.use(cors({ origin: '*' }));
app.use(express.json());

// GALLERY
app.post('/gallery', (req, res) => {
    const photoObj = req.body;

    photos.insert(photoObj);

    res.status(200).send('OK!');
});

// GET Gallery
app.get('/gallery', async (req, res) => {
    let resObj: resObj = {
        success: false,
    }

    if (req.headers.authorization !== undefined) {
        const user = req.headers.authorization.replace('Bearer ', '');

        const userPhotos: photo[] = await photos.find({ photographer: user });

        if (userPhotos.length > 0) {
            resObj.success = true;
            resObj.data = userPhotos;
        };
    };

    res.json(resObj);
});


//SIGNUP
app.post('/signup', async (req, res) => {
    const credentials: account = req.body;

    let resObj: resObj = {
        success: true,
    }

    const usernameExist = await accounts.find({
        username: credentials.username
    })

    if (usernameExist.length > 0) {
        resObj.success = false;
    } else {
        // hash password 
        const hashedPassword = await hashPassword(credentials.password);
        // update credentials object
        credentials.password = hashedPassword;
        // insert into database
        accounts.insert(credentials);
    };

    res.json(resObj);

});

// LOGIN
app.post('/login', async (req, res) => {
    const login: login = req.body;

    let resObj: resObj = {
        success: false,
    }

    console.log('LOGIN: ', login);

    const account = await accounts.find({
        username: login.username
    })

    if (account.length > 0) {
        console.log('User found!')
        const correctPassword = await comparePassword(login.password, account[0].password);

        if (correctPassword) {
            console.log('Password correct!')
            resObj.success = true;
        }
    }

    res.json(resObj);
});


app.listen(PORT, () => {
    console.log('Server now running on port ', PORT);
});

