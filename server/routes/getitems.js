const express = require('express');
const fetchuser = require('../middleware/fetchuser.js');
const router = express.Router()
const Items = require("../models/items.js")

router.get("/",fetchuser, async (req, res) => {
    let success = true;
    try {
        const list = await Items.find({userid : req.user.id}).sort({ createdAt: -1 }).collation({locale : "en_US", numericOrdering : true})
        console.log("Someone hit your get endpoint");
        res.json({success,list})
    } catch (error) {
        console.log(error.message);
    }
})

module.exports = router
