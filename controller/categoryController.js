'use strict'

const connection = require("../database/connect");
const isEmpty = require("lodash.isempty");

// GET
exports.home = (req, res) => {
    res.send("Hello World!");
};

exports.allCat = (req, res) => {
    connection.query(
        `SELECT * FROM category`,
        (err, result, field) => {
            if(err) {
                throw err;
            } else {
                return res.json(result);
            }
        }
    );
}

exports.category = (req, res, next) => {
    let id = req.params.id;

    if(id === 0 || id === '') {
        next("route");
    } else {
        connection.query(
            `SELECT * FROM category WHERE id = ?`,
            [id],
            (err, result, field) => {
                if(err) {
                    throw err;
                } else {
                    if(result.length === 0 || result.length === '') {
                        res.send({
                            error: true,
                            message: "No data found!"
                        });
                    } else {
                        return res.send({
                            status: 200,
                            message: "Data note id : " + id + " loaded!",
                            data : {
                                result
                            }
                        });
                    }
                }
            }
        )
    }
}

// POST
exports.addCat = (req, res) => {
    let name = req.body.name;

    if(isEmpty(req.body.name)) {
        res.send({
            error: true,
            message: "Data must filled!"
        });
    } else {
        connection.query(
            `INSERT INTO category SET name=?`,
            [name],
            (err, result, field) => {
                if(err) {
                    throw err;
                } else {
                    let resultId = result.insertId;

                    return res.send({
                        status: 200,
                        error: false,
                        message: "Successfully create a new NOTE!",
                        data: {
                            'id' : resultId,
                            'name' : name,
                            'timestamp' : result['timestamp']
                        }
                    });
                }
            }
        );
    }
}

// PATCH or UPDATE
exports.editCat = (req, res, next) => {
    // get id from link with params
    let id = req.params.id;

    if(id === 0 || id === '') {
        next("route");
    } else {
        // initialize all data
        let name = req.body.name;

        if(isEmpty(req.body.name)) {
            res.send({
                error: true,
                message: 'Data must filled!'
            });
        } else {
            connection.query(
                `UPDATE category SET title=?, note=?, time=?, category_id=? WHERE id=?`,
                [name, id],
                (err, result, field) => {
                    if(err) {
                        throw err;
                    } else {
                        if(result.affectedRows == 0 || result.affectedRows == '') {
                            res.send({
                                error: true,
                                message: "No data found!"
                            });
                        } else {
                            return res.send({
                                error: false,
                                data: result,
                                message: "Update Success!"
                            });
                        }
                    }
                }
            );
        }
    }
}

// DELETE
exports.deleteCat = (req, res, next) => {
    let id = req.params.id;

    if(id == 0 || id === '') {
        next("route");
    } else {
        connection.query(
            `DELETE FROM category WHERE id=?`,
            [id],
            (err, result, field) => {
                if(err) {
                    throw err;
                } else {
                    if(result.affectedRows === 0 || result.affectedRows === '') {
                        res.send({
                            error: true,
                            message: "No data found!"
                        });
                    } else {
                        return res.send({
                            status : 200,
                            message : "Delete successfully!",
                            data : {
                                'id' : id
                            }
                        });
                    }
                }
            }
        );
    }
}