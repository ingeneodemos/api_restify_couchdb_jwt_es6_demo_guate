module.exports.getUrlApi=function(name){
    const url = global.config.apiName+global.config.apiVersion+"/"+name;
    log.info("service : "+url);
    return url;
}

module.exports.error=function(error){
    return {error:error}
}

module.exports.ok=function(result){
    return {success:true,"result":result || "ok"}
}


module.exports.validateArgs=function(){
    for(var i=0;i<arguments.length;i+=2){
        if(arguments[i]==null)
            return arguments[i+1];
    }
    return null;
}