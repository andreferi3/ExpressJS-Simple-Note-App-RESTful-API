'use strict'

const connection = require("../database/connect");
const response = require("../responses");

exports.noteByCatId = (req, res, next) => {
    let id = req.params.id;

    connection.query(
        `SELECT notes.id AS id_note, notes.title AS notes_title, notes.note AS note_description, notes.created_at, notes.updated_at, category.name AS category FROM notes LEFT JOIN category ON notes.category_id = category.id WHERE category.id = ?`,
        [id],
        (err, result, field) => {
            if(err) {
                throw err;
            } else {
                if(result.length == 0 || result.length === '') {
                    return response.err(404, "Data not found!", res);
                } else {
                    return response.ok(200, "Data loaded!", res, result);
                }
            }
        }
    );
}