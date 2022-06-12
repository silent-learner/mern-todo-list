const jwt = require('jsonwebtoken');
const SECRET_KEY = "#!^@*HH*&*&Gkjdjdv65df51df5^^&@TGvhd060262...230"

const fetchuser = (req,res,next) => {
    let success = false
    const token = req.header('auth-token')
    if (!token) {
         res.status(401).json({ success,message:"invalid token"})
         console.log("Error token not present in header");
    }
    try {
        const data = jwt.verify(token , SECRET_KEY)
        req.user = data.user
        next()
    } catch (error) {
        res.status(401).json({ success,message:"invalid token"})
        console.log(error.message);
    }
}

module.exports = fetchuser