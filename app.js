const express = require("express");
const app = express();
const authRouter = require("./routes/authRouter");
const postsRouter = require("./routes/postsRouter");
const cors = require("cors");

const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(authRouter);
app.use("/posts", postsRouter);
app.use(cors());

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
})