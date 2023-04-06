const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET
const ensureToken = function ensureToken(req, res, next) {
    
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      req.token = bearerToken;

      // if(token== null)
      //   return res.sendStatus(403)
      // console.log('req is -> ',req)

      jwt.verify(req.token,secret,(err,data) => {
                if(err){
                        res.send(403);
                }else {
                    
                  // console.log('data is -> ',data)
                  next();
                }
        
        
      
      })




      
    } else {
      res.sendStatus(403);
    }
}
module.exports={ensureToken}