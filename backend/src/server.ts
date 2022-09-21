import express from 'express';
import cors from 'cors';
import { account, accounts, login, photo, photos } from './databases/databases'
import { hashPassword, comparePassword } from './bcrypt';

const app = express();
const PORT = 1337;

app.use(cors({ origin: '*' }));
app.use(express.json());

// GALLERY
app.post('/gallery', (req, res) => {
    const data = req.body.data
    const photoObj: photo = {
        url: data
    };

    photos.insert(photoObj);

    res.status(200).send('OK!');
});


//SIGNUP
app.post('/signup', async (req, res) => {
    const credentials: account = req.body;

    let resObj = {
        success: true,
        usernameExist: false,     // eventuellt ta bort senare, ifall vi ej inkluderar email
    }

    const usernameExist = await accounts.find({
        username: credentials.username
    })

    if (usernameExist.length > 0) {
        resObj.usernameExist = true;
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

    let resObj = {
        success: false,
    }

    console.log('LOGIN: ', login);

    const account = await accounts.find({
        username: login.username
    })

    if (account.length > 0) {
        console.log('User found!')
        const correctPassword = await comparePassword(login.password, account[0].password);

        if (correctPassword){
            console.log('Password correct!')
            resObj.success = true;
        }
    } 

    res.json(resObj);
});

app.listen(PORT, () => {
    console.log('Server now running on port ', PORT);
});

