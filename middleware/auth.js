const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'] || req.body.token || req.query.token;
    if(!token){
        res.json("Token a ulaşılamadı")
    }else{
        if (token.startsWith('Bearer ')) {
            // Remove Bearer from string
            token = token.slice(7, token.length);
        }
        jwt.verify(token, req.app.get('api_secret_key'), (err, decoded) => {
            if(err){
                res.json("failed to authenticate token.")
            }else{
                req.decode = decoded;
                next();
            }
        })
    }
};