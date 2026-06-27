const express = require('express');
const router = express.Router();

const Cart = require('../models/Cart');
const authMiddleware = require('../middleware/auth');


router.get('/debug', async (req, res) => {
    const carts = await Cart.find();
    res.json(carts);
});


//장바구니 조회
router.get('/', authMiddleware, async (req, res) => {
    console.log('조회 userId:', req.userId);

    const cart = await Cart.findOne({ userId: req.userId });

    console.log('조회 결과:', cart);

    res.json(cart || { items: [] });
});


router.post('/add', authMiddleware, async (req, res) => {

    console.log('받은 데이터:', req.body);
    console.log('현재 사용자:', req.userId);

    let cart = await Cart.findOne({ userId: req.userId });

    if (!cart) {
        cart = new Cart({
            userId: req.userId,
            items: []
        });
    }

    cart.items.push({
        id: req.body.id,
        name: req.body.name,
        summary: req.body.summary
    });

    await cart.save();

    console.log('저장 완료');
    console.log(cart);

    res.json(cart);
});

router.delete('/:id', authMiddleware, async (req, res) => {
    const cart = await Cart.findOne({ userId: req.userId });

    if (!cart) return res.json({ items: [] });

    cart.items = cart.items.filter(item => item.id !== req.params.id);

    await cart.save();

    res.json(cart);
});

module.exports = router;