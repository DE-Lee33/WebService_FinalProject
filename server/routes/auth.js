const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const router = express.Router();

router.post('/register', async (req, res) => {

    try {
        const { id, password } = req.body;
        const existingUser =
            await User.findOne({ id });

        if (existingUser) {
            return res.status(400).json({
                message: '이미 존재하는 아이디'
            });
        }

        const hashedPassword =
            await bcrypt.hash(password, 10);

        const user = new User({
            id,
            password: hashedPassword
        });

        await user.save();

        res.status(201).json({
            message: '회원가입 성공'
        });

    }
    catch (error) {
        res.status(500).json({
            message: '서버 오류'
        });
    }

});


router.post('/login', async (req, res) => {
    const { id, password } = req.body;

    const user = await User.findOne({ id });

    if (!user) {
        return res.status(400).json({ message: '아이디 없음' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(400).json({ message: '비밀번호 틀림' });
    }

    const token = jwt.sign(
        { userId: user._id },
        'secretKey',
        { expiresIn: '1h' }
    );

    res.json({ token });
});



module.exports = router;