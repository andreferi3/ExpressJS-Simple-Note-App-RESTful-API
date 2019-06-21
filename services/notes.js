'use strict'

const isEmpty = require("lodash.isempty");
var model = require("../models");

exports.getAllData = (query, callback) => {

    var search = query.search,
        sort = query.sort,
        page = query.page,
        pageLimit = query.pageLimit;

    var sql = `SELECT notes.id AS id_note, notes.title AS notes_title, notes.note AS note_description, notes.createdAt, notes.updatedAt, categories.name AS category FROM notes LEFT JOIN categories ON notes.categoryId = categories.id`;

    if(search) {
        sql += ` WHERE notes.title LIKE '%${query.search}%'`;
    }

    if(isEmpty(sort) || sort == '') {
        sql += ` ORDER BY createdAt DESC`;
    } else {
        sql += ` ORDER BY createdAt ${query.sort}`;
    }
    
    let startPage = (page - 1) * pageLimit;

    sql += ` LIMIT ${pageLimit} OFFSET ${startPage}`;

    model.sequelize.query(sql).spread((data) => {
        callback(data);
    });

    // (!isEmpty(req.query.page) ? currentPage = parseInt(req.query.page) : currentPage = 1);

    // var pageCount = Math.ceil(totalPage / limit);

    // sequelize.query(query).spread((data) => {

    //     res.json({
    //         status: 200,
    //         message: "Data loaded",
    //         TotalData: totalPage,
    //         CurrentPage: currentPage,
    //         Limit: limit,
    //         TotalPage: pageCount,
    //         result: callback(data)
    //     });
    // });
}

exports.servicesAllCounts = (query, callback) => {
    var queryCount = `SELECT COUNT(*) as totalPage FROM notes`;

    if(query.search) {
        queryCount += ` WHERE notes.title LIKE '%${query.search}%'`
    }
    model.sequelize.query(queryCount).spread(
        data => {
            callback(data);
        }
    )
}