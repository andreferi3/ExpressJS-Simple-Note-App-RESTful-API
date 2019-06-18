'use strict'

const connection = require("../database/connect");
const moment = require("moment");
const isEmpty = require("lodash.isempty");

// GET
exports.home = (req, res) => {
    res.send("Hello World!");
};

exports.allNotes = (req, res) => {
    connection.query(
        `SELECT * FROM notes`,
        (err, result, field) => {
            if(err) {
                throw err;
            } else {
                return res.json(result);
            }
        }
    );
}

exports.notes = (req, res, next) => {
    let id = req.params.id;

    if(id === 0 || id === '') {
        next("route");
    } else {
        connection.query(
            `SELECT * FROM notes WHERE id = ?`,
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
exports.addNote = (req, res) => {
    let title = req.body.title;
    let note = req.body.note;
    // Make a date according to today
    let today = moment().format("YYYY-MM-DD");
    // get category id
    let catId = req.body.category_id;

    if(isEmpty(req.body.title) && isEmpty(note) && isEmpty(catId)) {
        res.send({
            error: true,
            message: "Data must filled!"
        });
    } else {
        connection.query(
            `INSERT INTO notes SET title=?, note=?, time=?, category_id=?`,
            [title, note, today, catId],
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
                            'title' : title,
                            'note desc' : note,
                            'time' : today
                        }
                    });
                }
            }
        );
    }
}

// PATCH or UPDATE
exports.editNote = (req, res, next) => {
    // get id from link with params
    let id = req.params.id;

    if(id === 0 || id === '') {
        next("route");
    } else {
        // initialize all data
        let title = req.body.title;
        let note = req.body.note;
        let catId = req.body.category_id;
        // make a date according to today
        let today = moment().format("YYYY-MM-DD");

        if(isEmpty(req.body)) {
            res.send({
                error: true,
                message: 'Data must filled!'
            });
        } else {
            connection.query(
                `UPDATE notes SET title=?, note=?, time=?, category_id=? WHERE id=?`,
                [title, note, today, catId, id],
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
exports.deleteNote = (req, res, next) => {
    let id = req.params.id;

    if(id == 0 || id === '') {
        next("route");
    } else {
        connection.query(
            `DELETE FROM notes WHERE id=?`,
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