const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 6000;

//middleware
app.use(express.json());

const blog = require("./routes/blog");
// mount
app.use("/api/v1", blog);

//database
const connectWithDb = require("./config/database");
connectWithDb();

//start the server
app.listen(PORT, () => {
    console.log (`App is started at PORT no ${PORT}`)
})


app.get("/", (req,res) => {
    res.send(`<h1>Ye mera Homepage hai</h1>`)
})