// router/imageRouter.js
const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/:imageName', (req, res) => {
    const imageName = req.params.imageName; // 클라이언트가 요청한 이미지 이름
    const imagePath = path.join(__dirname, '../images', imageName); // 이미지가 저장된 경로
    res.sendFile(imagePath, (err) => {
        if (err) {
            console.error(err);
            res.status(404).send('Image not found');
        }
    });
});

module.exports = router;
