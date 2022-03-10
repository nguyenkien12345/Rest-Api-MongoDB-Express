const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
// Để sử dụng cấu hình file .env
const dotenv = require('dotenv');
const AuthRoute = require('./routes/AuthRoute');
const BookRoute = require('./routes/BookRoute');

const app = express();

// Sử dụng các biến trong file .env
dotenv.config();

// Setup Mongoose
mongoose.connect(process.env.MONGODB_URL, function (err) {
    if (!err) {
        console.log('Connect MongoDB Successfully');
    }
    else {
        console.log('Connect MongoDB Failure');
    }
})

app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());
// morgan('common'): Khi bạn send 1 request nào đó nó sẽ giúp các bạn báo dưới terminal cho biết là request đó đã được send thành công hay thất bại
app.use(morgan('common'));

// Routes
app.use('/v1/author', AuthRoute);
app.use('/v1/book', BookRoute);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is listening at PORT ${PORT}`)
})

