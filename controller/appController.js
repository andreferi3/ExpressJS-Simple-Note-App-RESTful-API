'use strict'

const connection = require("../database/connect");

exports.app = (req, res) => {
    connection.query(
        `SELECT notes.id AS id_note, notes.title AS notes_title, notes.note AS note_description, category.name AS category FROM notes LEFT JOIN category ON notes.category_id = category.id`, 
        (err, result, field) => {
            if(err) {
                throw err;
            } else {
                res.status(200).send({
                    status : 200,
                    error : false,
                    result
                });
            }
        }
    );
}

exports.noteByCatId = (req, res, next) => {
    let id = req.params.id;

    connection.query(
        `SELECT notes.id AS id_note, notes.title AS notes_title, notes.note AS note_description, category.name AS category FROM notes LEFT JOIN category ON notes.category_id = category.id WHERE category.id = ?`,
        [id],
        (err, result, field) => {
            if(err) {
                throw err;
            } else {
                if(result.length == 0 || result.length === '') {
                    res.status(404).send({
                        status: 404,
                        message: "Data not found!"
                    });
                } else {
                    res.json({
                        error: false,
                        message: "Succes load data notes by cat id : " + id,
                        data : {
                            result
                        }
                    });
                }
            }
        }
    );
}