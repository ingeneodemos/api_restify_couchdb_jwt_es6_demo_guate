module.exports=function(req, res, next){
    global.jwt.verify(req.headers.token, global.config.jwtPassword, function(err){
        if(err){
          res.send(500,global.utils.error(global.msg.error_invalid_token));
        }else{
          next();
        }
    })
}