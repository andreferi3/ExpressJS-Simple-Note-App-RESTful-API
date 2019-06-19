'use strict'

exports.ok = (sts, msg, res, result) => {
    let data = {
        status: sts,
        message: msg,
        result
    };

    res.status(sts).json(data);
    res.end();
}

exports.err = (sts, msg, res) => {
    let data = {
        status : sts,
        message : msg,
    };

    res.status(sts).json(data);
    res.end();
}

exports.post = (sts, msg, res, result) => {
    
    let data = {
        status : sts,
        error : false,
        message : msg,
        data : {
            "id" : resultID,
            "title" : title,
            "note desc" : note,
            "time" : result['timestamp']
        }
    }

    res.status(sts).json(data);
    res.end();
}

exports.postCat = (sts, msg, res, result) => {
    
    let data = {
        status : sts,
        error : false,
        message : msg,
        data : {
            "id" : resultID,
            "name" : name,
            "time" : result['timestamp']
        }
    }

    res.status(sts).json(data);
    res.end();
}