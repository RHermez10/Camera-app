import express from 'express';
import { account, accounts, photo, photos, resObj } from '../databases/databases';
const router = express.Router();

// GET
router.get('', async (req, res) => {
    let resObj: resObj = {
        success: false,
    }

    if (req.headers.authorization !== undefined) {
        const user = req.headers.authorization.replace('Bearer ', '');
        const account: account[] = await accounts.find({ username: user });
        let photoArray: photo[];

        if (account[0].admin == true) {
            photoArray = await photos.find({});
        } else {
            photoArray = await photos.find({ photographer: user });
        }

        if (photoArray.length > 0) {
            resObj.success = true;
            resObj.data = photoArray;
        };

    };

    res.json(resObj);
});

// POST
router.post('', (req, res) => {
    const photoObj = req.body;

    photos.insert(photoObj);

    res.status(200).send('OK!');
});

// DELETE
router.delete('', async (req, res) => {
    let result: resObj = {success: false};

    const photoId: string = req.body.id;

    const removed: number = await photos.remove({ _id: photoId }, {});

    if (removed > 0) {
        result.success = true;
    } 

    res.json(result);

});

module.exports = router;