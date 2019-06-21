'use strict'

const isEmpty = require("lodash.isempty");
var model = require("../models/index");
var noteService = require("../services").notes;

exports.allData = async (req, res, next) => {
    try {
        var totalPage, totalData;
        let pageLimit = (isEmpty(req.query.limit)) ? 10 : parseInt(req.query.limit);

        var page = (isEmpty(req.query.page) || req.query.page == '' ? 1 : parseInt(req.query.page));

        let query = {};
        query.search = req.query.search;
        query.sort = req.query.sort;
        query.page = page;
        query.pageLimit = pageLimit;

        await noteService.servicesAllCounts(query, (total => {
            totalData = total[0].totalPage;
            totalPage = Math.ceil(totalData / pageLimit);
        }))

        await noteService.getAllData(query, (result => {
            if(result.length > 0) {
                res.status(200).json({
                    status: "OK",
                    message: "Data loaded!",
                    totalData: totalData,
                    currentPage: page,
                    totalPage: totalPage,
                    Limit: pageLimit,
                    Result: result
                });
            } 
            else {
                res.status(400).json({
                    status: "Error",
                    message: "Empty",
                    data: {}
                })
            }
        })
    ) 
    } catch(err) {
        res.status(400).json({
            status: "Error",
            message: err.message,
            data: {}
        });
    }
}

exports.addNote = async (req, res, next) => {
    try {
        const {
            title,
            note,
            categoryId
        } = req.body;

        const notes = await model.notes.create({
            title,
            note,
            categoryId
        });

        if(notes) {
            res.status(201);
            res.json({
                status: 201,
                message: "Success add new notes!",
                data: notes
            });
        }
    } catch(err) {
        res.json({
            status: 400,
            message: "Data not found!",
            data: {}
        })
    }
}

exports.updNote = async (req, res, next) => {
    try {
        const noteId = req.params.id;

        const {
            title, note, categoryId
        } = req.body;

        const notes = await model.notes.update({
            title, note, categoryId
        }, {
            where : {
                id : noteId
            }
        });

        if(notes) {
            res.status(201).json({
                status: "OK",
                message: "Success update notes",
                data: notes
            })
        }
    } catch(err) {
        res.status(404).json({
            status: "Error",
            message: err.message,
            data: {}
        });
    }
}

exports.delNote = async (req, res, next) => {
    try {
        const noteId = req.params.id;

        const notes = await model.notes.destroy({
            where: {
                id : noteId
            }
        });

        if(notes) {
            res.status(200).json({
                status: "OK",
                message: "Success delete note",
                data: notes
            });
        }
    } catch(err) {
        res.status(404).json({
            status: "Error",
            message: err.message,
            data: {}
        });
    }
}