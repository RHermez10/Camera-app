import express from 'express';
import cors from 'cors';
import { accounts, photos } from './databases/databases'

const app = express();
const PORT = 1337;

app.use(cors({origin: '*'}));
app.use(express.json());

app.post('/gallery', (req, res) => {
console.log(`REQ.body: `, req.body.data);
res.status(200).send('OK!');
});

app.post('/signup', async (req,res)=>{
const credentials = req.body;

let userObj = {
    success: true,
    usernameExist: false,
    emailExist: false
}

const usernameExist = await accounts.find({
    username: credentials.username
})

const emailExist = await accounts.find({
    email: credentials.email
})

})

app.listen(PORT, () => {
    console.log('Server now running on port ', PORT);
});

