const jwt = require("jsonwebtoken");

const isAuth = (req,res,next) => {
    const jwtToken = req.header("Authorization").split(" ")[1];
    console.log(jwtToken);
    jwt.verify(jwtToken,"supersecretsentence",(err,result) => {
        if(err){
            throw new Error("invalid token");
        }
        if(!result){
            return res.status(401).json({
                msg:"invalid token"
            })
        }
        req.email = result.email;
        req.userId = result.userId;
        next();
    })
}
module.exports = isAuth;