const express = require("express");

const mongoose = require("mongoose");

const authRouter = require("./routes/auth");

const favouriteRouter = require("./routes/favourite");

const app = express();

app.use(authRouter);

app.use(favouriteRouter);

mongoose.connect(`mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.kpq9o.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`)
.then((result) => {
    app.listen(3000);
})
.catch((err) => {
    console.log(err);
})