const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const URI = "mongodb://localhost:27017/kashifdb"

const app = express()
app.use(cors())
app.use(express.json())

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
        app.listen(8080, () => {
            console.log(`Server running at http://localhost:8080`);
        })
    })
    .catch(err => console.log(err.message))
