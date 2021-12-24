const express = require('express');
const fetchuser = require('../middleware/fetchuser.js');
const router = express.Router()
const Items = require("../models/items.js")

//post
router.post("/",fetchuser, async (req,res) => {

    try {
        const already = await Items.findOne({$and  : [{name : req.body.name , userid : req.user.id}]})
        if (!already) {
            const item = new Items({
                userid : req.user.id,
                name : req.body.name
            })
            const added = await item.save()
            console.log(added,"\nSomeone hit your post endpoint");
            res.json({success : true,message : "Item added successfully."})
        } else {
            res.status(400).json({success : false,message : "Item already exists."})
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).json({success : false,message : "Item already exists."})
    }
}) 
//update
router.post("/:id",fetchuser , async (req , res) => {
    try {
        // const item = await Item.findById(req.params.id)
        const updated = await Items.updateOne({$and  : [{_id : req.params.id , userid : req.user.id}]} , {$set : {name : req.body.name }})
        if (updated.matchedCount) {
            res.json({success : true,message : "Updated"})
            console.log(updated,`\nSomeone hit your update endpoint.`)
        } else {
            res.status(400).json({success : false ,message : "Item does not exists"});
            console.log(updated,`\nSomeone hit your update endpoint.`)
        }
    } catch (error) {
        console.log(error.message)       
        res.status(500).json({success : false,message : "Internal Server Error."})
    }
})

module.exports =  router