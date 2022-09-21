import express from 'express';
import { comparePassword, hashPassword } from '../bcrypt';
import { account, accounts, login, resObj } from '../databases/databases';
const router = express.Router();

// POST SIGNUP
router.post('/signup', async (req, res) => {
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

// POST LOGIN
router.post('/login', async (req, res) => {
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

module.exports = router;