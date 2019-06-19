'use strict'

const connection = require("../database/connect");
const isEmpty = require("lodash.isempty");
const response = require("../responses");

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
                return response.ok(200, "Data loaded!", res, result);
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
                        return response.err(404, "Data not found!", res);
                    } else {
                        return response.ok(200, "Data Loaded!", res, result);
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
        return response.err(404, "Data not found!", res);
    } else {
        connection.query(
            `INSERT INTO category SET name=?`,
            [name],
            (err, result, field) => {
                if(err) {
                    throw err;
                } else {
                    let resultId = result.insertId;
                    return response.postCat(201, "Success create new category!", res, result);
                }
            }
        );
    }
}

// PATCH or UPDATE
exports.editCat = (req, res, next) => {
    // get id from link with params
    let id = req.params.id;

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
                        return response.err(404, "Data not found!", res);
                    } else {
                        return response.postCat(201, "Success update category!", res, result);
                    }
                }
            }
        );
    }
}

// DELETE
exports.deleteCat = (req, res, next) => {
    let id = req.params.id;

    connection.query(
        `DELETE FROM category WHERE id=?`,
        [id],
        (err, result, field) => {
            if(err) {
                throw err;
            } else {
                if(result.affectedRows === 0 || result.affectedRows === '') {
                    return response.err(404, "Data not found!", res);
                } else {
                    return response.ok(200, "Success delete category!", res, result);
                }
            }
        }
    );
}