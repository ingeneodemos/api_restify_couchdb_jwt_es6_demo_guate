

export function get(req, res){
    global.db.getAllDocuments(global.config.couchDbName, {limit:10, include_docs:true})
    .then((data)=>{
        const docs = []
        const rows= data.data.rows
        for(var i=0;i<rows.length;i++){
            docs.push(rows[i].doc)
        }
        res.send(docs)
    });
}

export function getById(req, res){
    const msgValidation=global.utils.validateArgs("id",req.params.id);
    if(msgValidation){
        global.utils.sendError(res, null, msgValidation, global.msg.code_bad_request);
        return;
    }
    global.db.getDocument(global.config.couchDbName, req.params.id)
    .then(response => { 
        res.send(200,response.data)
    }, (err)=>{
        log.error(err);
        res.send(global.msg.code_error, global.utils.error(err.message))
    })
}


export function post(req, res){
    const msgValidation=global.utils.validateArgs("value",req.body.value, "pin",req.body.pin, "msisdn",req.body.msisdn, "rechargedate",req.body.rechargedate, "type");
    if(msgValidation){
        global.utils.sendError(res, null, msgValidation, global.msg.code_bad_request);
        return;
    }
    global.db.createDocument(global.config.couchDbName, {value:req.body.value, pin:req.body.pin, msisdn:req.body.msisdn, rechargedate:req.body.rechargedate, type:req.body.type})
    .then(data => { 
        if(data){
            res.send(200, data.data)
        }else{
            res.send(500, global.utils.error("Error al guardar"))
        }
    }, (err)=>{
        log.error(err);
        res.send(global.msg.code_error, global.utils.error(err.message))
    }) 
}

export function put(req, res){
    const msgValidation=global.utils.validateArgs("value",req.body.value, "pin",req.body.pin, "msisdn",req.body.msisdn, "rechargedate",req.body.rechargedate, "type",req.body.type,"_rev",req.body._rev, "_id",req.body._id);
    if(msgValidation){
        global.utils.sendError(res, null, msgValidation, global.msg.code_bad_request);
        return;
    }
    global.db.createDocument(global.config.couchDbName, {value:req.body.value, pin:req.body.pin, msisdn:req.body.msisdn, rechargedate:req.body.rechargedate, type:req.body.type,_rev:req.body._rev, _id:req.body._id}, req.body._id)
    .then(data => { 
        if(data){
            res.send(200, data.data)
        }else{
            res.send(500, global.utils.error("Error al guardar"))
        }
    },(err)=>{
        log.error(err);
        res.send(global.msg.code_error, global.utils.error(err.message))
    }) 
}

export function del(req, res){
    const msgValidation=global.utils.validateArgs("id", req.params.id, "rev",req.params.rev);
    if(msgValidation){
        global.utils.sendError(res, null, msgValidation, global.msg.code_bad_request);
        return;
    }

    global.db.deleteDocument(global.config.couchDbName, req.params.id , req.params.rev)
    .then((data)=>{
        if(data){
            res.send(200, data.data)
        }else{
            res.send(500, global.utils.error("Error al eliminar"))
        }
    }, (err)=>{
        log.error(err);
        res.send(global.msg.code_error, global.utils.error(err.message))
    })
}

export function options(req, res){
    res.set("access-control-allow-methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
    res.set("access-control-allow-credentials", true);
    res.end();
}