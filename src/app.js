import restify from "restify";

global.jwt = require('jsonwebtoken');
global.config=require("./config/development");
global.msg=require("./config/common/msg");
global.resources=require("./config/common/resources");

global.log=require("./helpers/log");
global.utils=require("./helpers/utils");

global.db = require('couchdb-promises')({
  baseUrl: config.couchUrl,
  requestTimeout: config.couchRequestTimeout
})


var recharge=require("./services/recharge");
var token=require("./services/token");
var auth=require("./services/auth");


var port = process.env.PORT || config.apiPort;

var server = restify.createServer({
    name: "Servicio restify"
});

server.get(global.utils.getUrlApi(global.resources.token), token.get);

if(config.jwtActive){
  server.use(auth);
}

server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, X-XSRF-TOKEN");
  next();
});

server.use(function(req, res, next){
    log.info(req.method + " "+ req.url);     
    next()
});


server.use(restify.bodyParser());

server.get(global.utils.getUrlApi("recharge"), recharge.get);
server.get(global.utils.getUrlApi("recharge/:id"), recharge.getById);
server.post(global.utils.getUrlApi("recharge"), recharge.post);
server.put(global.utils.getUrlApi("recharge"), recharge.put);
server.del(global.utils.getUrlApi("recharge/:id/:rev"), recharge.del);
server.opts(".*", recharge.options);

server.listen(port, function(){
   log.info("servidor iniciado en  : "+port); 
});