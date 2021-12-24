const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require("dotenv")
const URI = "mongodb://localhost:27017/kashifdb"

const PORT = process.env.PORT || 8080
const app = express()
app.use(cors())
app.use(express.json())
dotenv.config()
app.use("/get", require("./routes/getitems.js"))
app.use("/post", require("./routes/postitems.js"))
app.use("/delete", require("./routes/deleteitems.js"))
app.use("/", require("./routes/createUser.js"))
app.get("/*" , (req,res) => {
    res.status(404).json({success : false ,"message" : "Page Doesn't Exist"})
})
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB connected")
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        })
    })
    .catch(err => console.log(err.message))
