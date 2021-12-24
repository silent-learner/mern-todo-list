const express = require('express');
const fetchuser = require('../middleware/fetchuser.js');
const router = express.Router()
const Items = require("../models/items.js")

router.delete("/:id",fetchuser,async (req,res) => {
    try {
        const item = await  Items.findOneAndDelete({$and : [{_id : req.params.id , userid : req.user.id}]});
        if (item) {
            res.json({success : true ,message : "Item deleted Successfully"});
            console.log(item,"\nSomeone hit your delete end point");
        }
        else{
            res.status(400).json({success : false ,message : "Item does not exists"});
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).json({success : false,message : "Internal Server Error."})
    }
})

module.exports =  router