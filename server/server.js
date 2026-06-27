const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const authRouter = require('./routes/auth');
const cartRouter = require('./routes/cart');

app.use(cors());
app.use(express.json());

mongoose.connect(
  'mongodb://127.0.0.1:27017/travel-app'
)
.then(() => console.log('MongoDB 연결 성공'))
.catch(err => console.log(err));

app.use('/api/auth', authRouter);
app.use('/api/cart', cartRouter);

app.listen(5000, () => {
  console.log('서버 실행');
});
