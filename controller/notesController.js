'use strict'

const connection = require("../database/connect");
const moment = require("moment");
const isEmpty = require("lodash.isempty");
const response = require("../responses");

// GET
exports.home = (req, res) => {
    res.send("Hello World!");
};

exports.allNotes = (req, res) => {

    var query = `SELECT notes.id AS id_note, notes.title AS notes_title, notes.note AS note_description, notes.time AS note_created, category.name AS category FROM notes LEFT JOIN category ON notes.category_id = category.id`;

    if(!isEmpty(req.query.search)) {
        let search = req.query.search;
        query += ` WHERE title LIKE '%${search}%'`;
    }
    
    if(!isEmpty(req.query.sort)) {
        let sort = req.query.sort;
        query += ` ORDER BY time ${sort}`;
    }

    var page, limit;

    (isEmpty(req.query.page) || req.query.page == '' ? page = 1 : page = parseInt(req.query.page));
    (isEmpty(req.query.limit) || req.query.limit == '' ? limit = 10 : limit = parseInt(req.query.limit));

    var startPage = (page - 1) * limit;

    query += ` LIMIT ${limit} OFFSET ${startPage}`;

    connection.query(
        query,
        (err, result, field) => {
            if(err) {
                throw err;
            } else {
                if(result.length === 0 || result.length === '') {
                    response.err(404, "Data not found!", res);
                } else {
                    response.ok(200, "Data loaded", res, result);
                }
            }
        }
    );
}

exports.notes = (req, res) => {
    let id = req.params.id;

    connection.query(
        `SELECT * FROM notes WHERE id = ?`,
        [id],
        (err, result, field) => {
            if(err) {
                throw err;
            } else {
                if(result.length === 0 || result.length === '') {
                    return response.err(404, "Data not found!", res);
                } else {
                    return response.ok(200, "Data loaded!", res, result);
                }
            }
        }
    );
}

// POST
exports.addNote = (req, res) => {
    let title = req.body.title;
    let note = req.body.note;
    let today = moment().format("YYYY-MM-DD");
    let catId = req.body.category_id;

    if(isEmpty(req.body.title) && isEmpty(note) && isEmpty(catId)) {
        response.err(404, "Data not found!", res);
    } else {
        connection.query(
            `INSERT INTO notes SET title=?, note=?, time=?, category_id=?`,
            [title, note, today, catId],
            (err, result, field) => {
                if(err) {
                    throw err;
                } else {
                    let resultId = result.insertId;
                    return response.post(201, "Successfully create a new note!", res, result);
                }
            }
        );
    }
}

// PATCH or UPDATE
exports.editNote = (req, res) => {
    let id = req.params.id;
    let title = req.body.title;
    let note = req.body.note;
    let catId = req.body.category_id;
    let today = moment().format("YYYY-MM-DD");

    if(isEmpty(req.body.title) && isEmpty(req.body.note) && isEmpty(req.body.catId)) {
        response.err(400, "Data body can't be empty!", res);
    } else {
        connection.query(
            `UPDATE notes SET title=?, note=?, time=?, category_id=? WHERE id=?`,
            [title, note, today, catId, id],
            (err, result, field) => {
                if(err) {
                    throw err;
                } else {
                    if(result.affectedRows == 0 || result.affectedRows == '') {
                        return response.err(400, "Data not found!", res);
                    } else {
                        let resultId = result.insertId;
                        return response.post(200, "Update data successful!", res, result);
                    }
                }
            }
        );
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
                       return response.err(404, "Data not found!", res);
                    } else {
                        return response.ok(200, "Success delete note!", res, result);
                    }
                }
            }
        );
    }
}