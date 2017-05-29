export function get(req, res){
    const username = req.headers.username;
    const password = req.headers.password;
    var users = global.config.jwtUsers;
    var user = null;
    for(var i=0;i<users.length;i++){
        if(username==users[i].username && password==users[i].password){
            user=users[i];
            break;
        }
    }
    if(!user){
        log.info("usuario o contra invalida");
        res.json(global.utils.error(global.msg.error_token_username_or_password_incorrect));
    }else{
        var token = global.jwt.sign(user, global.config.jwtPassword, {expiresIn:global.config.jwtExpireTokenTime});
        res.json(global.utils.ok({token:token}));
    }
}