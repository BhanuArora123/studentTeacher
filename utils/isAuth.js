const jwt = require("jsonwebtoken");

const isAuth = (req,res,next) => {
    const jwtToken = req.headers("authorization").split(" ")[1];
    console.log(jwtToken);
    jwt.verify(jwtToken,"supersecretsentence")
    .then((result) => {
        if(!result){
            return res.status(401).json({
                msg:"invalid token"
            })
        }
        req.email = result.email;
        req.userId = result.userId;
        next();
    }).catch((err) => {
        console.log(err);
    });
}